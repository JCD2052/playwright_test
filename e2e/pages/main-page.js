const {BasePage} = require("./base-page");
const URL = 'https://www.euronews.com';
const NEWSLETTER_LOCATOR = '[data-event="newsletter-link-header"]';

class EuronewsMainPage extends BasePage {

    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        super(page, NEWSLETTER_LOCATOR);
        this.newsletterLink = page.locator(NEWSLETTER_LOCATOR);
        this.aggreeCookiesButton = page.locator(`//button[contains(@id, 'agree')]`);
    }

    async goToPage() {
        await this.page.goto(URL);
    }

    async goToNewsletters() {
        await this.newsletterLink.click();
    }


    async clickAgreeCookies() {
        if (await this.aggreeCookiesButton.isVisible()) {
            await this.aggreeCookiesButton.click()
        }
    }
}

export {EuronewsMainPage}