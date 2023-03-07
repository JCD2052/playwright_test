import {Link} from "./framework/elements/link.js";
import {Button} from "./framework/elements/button.js";

const {BasePage} = require("./base-page");

class EuronewsMainPage extends BasePage {
    static #NEWSLETTER_LOCATOR = '[data-event="newsletter-link-header"]';
    #newsletterLink = new Link(EuronewsMainPage.#NEWSLETTER_LOCATOR);
    #agreeCookiesButton = new Button(`//button[contains(@id, 'agree')]`);


    constructor() {
        super(EuronewsMainPage.#NEWSLETTER_LOCATOR);
    }

    async goToNewsletters() {
        await this.#newsletterLink.click();
    }

    async clickAgreeCookies() {
        if (await this.#agreeCookiesButton.isVisible()) {
            await this.#agreeCookiesButton.click()
        }
    }
}

export default new EuronewsMainPage();