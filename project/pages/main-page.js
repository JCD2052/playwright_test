import {Link} from "../../framework/elements/link.js";
import {Button} from "../../framework/elements/button.js";

const {BasePage} = require("./base-page");

class EuronewsMainPage extends BasePage {
    static #NEWSLETTER_LOCATOR = '[data-event="newsletter-link-header"]';
    #newsletterLink = new Link(EuronewsMainPage.#NEWSLETTER_LOCATOR);
    #agreeCookiesButton = new Button(`//button[contains(@id, 'agree')]`);


    constructor() {
        super(EuronewsMainPage.#NEWSLETTER_LOCATOR);
    }

    /**
     * Method to click on newsletter button.
     * @returns {Promise<void>}
     */
    async goToNewsletters() {
        await this.#newsletterLink.click();
    }

    /**
     * Method which wait until cookie banner and click to agree.
     * @returns {Promise<void>}
     */
    async clickAgreeCookies() {
        if (await this.#agreeCookiesButton.isVisible()) {
            await this.#agreeCookiesButton.click()
        }
    }
}

export default new EuronewsMainPage();