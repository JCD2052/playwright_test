import {test, expect} from '@playwright/test';
import ConfirmEmailPage from '../../project/pages/confirfm-email-page';
import EuronewsMainPage from '../../project/pages/main-page';
import NewsLetterPage from '../../project/pages/newsletter-page';
import {PreviewWindow} from "../../project/pages/preview-window";
import UnsubscribePage from '../../project/pages/unsubscribe-page';
import ApiConfig from "../../project/config/config.json";
import {getConfirmationLinkFromMessage, getEuronewsEmails} from "./steps/emails-steps";
import {Navigation} from "../../framework/browser/navigation";
import {PageHolder} from "../../framework/browser/page-holder";
import {waitUntil} from "../../project/gmail/api/utils/wait-utils";

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

        await EuronewsMainPage.clickAgreeCookies();
        await expect(EuronewsMainPage.isPageOpened(),
            'Should be on main page').toBeTruthy();

        await EuronewsMainPage.goToNewsletters();

        await NewsLetterPage.waitForLoading();
        expect(await NewsLetterPage.isPageOpened(),
            'Should be on newsletter page').toBeTruthy();

        const topicElement = await NewsLetterPage.findRandomTopic();
        await NewsLetterPage.selectTopic(topicElement);
        await expect(NewsLetterPage.signUpForm.isFormOpened(),
            'Sign up form has appeared').toBeTruthy();
        await NewsLetterPage.signUpForm.subscribeToTopic(EMAIL);

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

        await Navigation.goToPage(confirmUrl);
        await ConfirmEmailPage.waitForLoading();

        expect(await ConfirmEmailPage.isPageOpened(),
            'Should be on confirmation page').toBeTruthy();

        await ConfirmEmailPage.backToMainPage();

        expect(await EuronewsMainPage.isPageOpened(),
            'Should be on main page').toBeTruthy();

        await EuronewsMainPage.goToNewsletters();
        await NewsLetterPage.waitForLoading();

        const previewElement = await NewsLetterPage.getPreviewElement(topicElement);
        await previewElement.click();
        const previewId = await previewElement.getHref();

        const previewPage = new PreviewWindow(previewId);
        await previewPage.goToUnsubscribe();

        await UnsubscribePage.unsubscribe(EMAIL);

        expect(await UnsubscribePage.isMessageShown(),
            'Message about unsubscription should be visible').toBeTruthy();

        const messagesCountAfterUnsubscribe = (await getEuronewsEmails()).length;
        expect(messagesCountBefore, "Count of messages should be same")
            .toBe(messagesCountAfterUnsubscribe);
    });
});