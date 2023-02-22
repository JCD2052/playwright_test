import {test, expect} from '@playwright/test';
import {ConfirmEmailPage} from '../pages/confirfm-email-page';
import {EuronewsMainPage} from '../pages/main-page';
import {NewsLetterPage} from '../pages/newsletter-page';
import {PreviewWindow} from "../pages/preview-window";
import {UnsubscribePage} from '../pages/unsubscribe-page';
import {waitUntil} from "../gmail/api/utils/wait-utils";
import ApiConfig from "../gmail/config/apiConfig.json";
import {getConfirmationLinkFromMessage, getEuronewsEmails} from "./steps/emails-steps";

const EMAIL = ApiConfig.email;

test.describe('Euronews UI tests.', () => {
    let page;
    test.beforeAll(async ({browser}) => {
        page = await browser.newPage();
    });

    test.afterAll(async ({browser}) => {
        await browser.close()
    });

    test('Euronews Subscribe random topic test.', async () => {
        const euronewsPage = new EuronewsMainPage(page);

        await euronewsPage.goToPage();
        await euronewsPage.clickAgreeCookies();
        await expect(euronewsPage.isPageOpened(),
            'Should be on main page').toBeTruthy();

        await euronewsPage.goToNewsletters();

        const newsLetterPage = new NewsLetterPage(page);
        await newsLetterPage.waitForLoading();

        const topicElement = await newsLetterPage.findRandomTopic();
        expect(await newsLetterPage.isPageOpened(),
            'Should be on newsletter page').toBeTruthy();

        await newsLetterPage.selectTopic(topicElement);
        await expect(newsLetterPage.signUpForm.emailTextInput,
            'Sign up form has appeared').toBeVisible();
        await newsLetterPage.signUpForm.subscribeToTopic(EMAIL);

        const currentTime = Date.now();

        let messagesCountBefore;
        const messageSupplier = async () => {
            const messages = await getEuronewsEmails();
            messagesCountBefore = messages.length;
            return messages
                .filter(messageInfo => messageInfo.timeReceived.getTime() >= currentTime)
                .find(Boolean);
        }
        const messageWithConfirmation = await waitUntil(messageSupplier, ApiConfig.gapiTimeout);
        expect(messageWithConfirmation, 'Received a message').toBeDefined();
        const confirmUrl = getConfirmationLinkFromMessage(messageWithConfirmation);

        const confirmEmailPage = new ConfirmEmailPage(page);
        await confirmEmailPage.goToPage(confirmUrl);
        await confirmEmailPage.waitForLoading();

        expect(await confirmEmailPage.isPageOpened(),
            'Should be on confirmation page').toBeTruthy();

        await confirmEmailPage.backToMainPage();

        expect(await euronewsPage.isPageOpened(),
            'Should be on main page').toBeTruthy();

        await euronewsPage.goToNewsletters();
        await newsLetterPage.waitForLoading();

        const previewElement = await newsLetterPage.getPreviewElement(topicElement);
        await previewElement.click();
        const previewId = await previewElement.getAttribute('href');

        const previewPage = new PreviewWindow(page, previewId);
        await previewPage.goToUnsubscribe();

        const unsubscribePage = new UnsubscribePage(page);
        await unsubscribePage.unsubscribe(EMAIL);

        expect(await unsubscribePage.isMessageShown(),
            'Message about unsubscription should be visible').toBeTruthy();

        const messagesCountAfterUnsubscribe = (await getEuronewsEmails()).length;
        expect(messagesCountBefore, "Count of messages should be same")
            .toBe(messagesCountAfterUnsubscribe);
    });
});