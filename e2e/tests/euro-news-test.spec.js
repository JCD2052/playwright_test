import {test, expect} from '@playwright/test';
import {ConfirmEmailPage} from '../pages/confirfm-email-page';
import {EuronewsMainPage} from '../pages/main-page';
import {NewsLetterPage} from '../pages/newsletter-page';
import {PreviewWindow} from "../pages/preview-window";
import {UnsubscribePage} from '../pages/unsubscribe-page';
import {waitUntil} from "../gmail/api/utils/wait-utils";
import ApiConfig from "../gmail/config/apiConfig.json";
import {getConfirmationLinkFromMessage, getEuronewsEmails} from "./steps/emails-steps";
import {Navigation} from "../pages/framework/browser/navigation";
import {PageHolder} from "../pages/framework/browser/page-holder";

const EMAIL = ApiConfig.email;

test.describe('Euronews UI tests.', () => {
    test.beforeAll(async ({browser}) => {
        PageHolder.page = await browser.newPage();
    });

    test.afterAll(async ({browser}) => {
        await browser.close()
    });

    test('Euronews Subscribe random topic test.', async () => {
        await Navigation.goToPage("/")
        const euronewsPage = new EuronewsMainPage();

        await euronewsPage.clickAgreeCookies();
        await expect(euronewsPage.isPageOpened(),
            'Should be on main page').toBeTruthy();

        await euronewsPage.goToNewsletters();

        const newsLetterPage = new NewsLetterPage();
        await newsLetterPage.waitForLoading();
        expect(await newsLetterPage.isPageOpened(),
            'Should be on newsletter page').toBeTruthy();

        const topicElement = await newsLetterPage.findRandomTopic();
        console.log(topicElement)
        await newsLetterPage.selectTopic(topicElement);
        // await expect(newsLetterPage.signUpForm.emailTextInput,
        //     'Sign up form has appeared').toBeVisible();
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

        const confirmEmailPage = new ConfirmEmailPage();
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
        const previewId = await previewElement.getHref();

        const previewPage = new PreviewWindow( previewId);
        await previewPage.goToUnsubscribe();

        const unsubscribePage = new UnsubscribePage();
        await unsubscribePage.unsubscribe(EMAIL);

        expect(await unsubscribePage.isMessageShown(),
            'Message about unsubscription should be visible').toBeTruthy();

        const messagesCountAfterUnsubscribe = (await getEuronewsEmails()).length;
        expect(messagesCountBefore, "Count of messages should be same")
            .toBe(messagesCountAfterUnsubscribe);
    });
});