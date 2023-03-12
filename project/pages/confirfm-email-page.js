import {Button} from "../../framework/elements/button.js";

const {BasePage} = require("./base-page");

class ConfirmEmailPage extends BasePage {
    static #BACK_TO_MAIN_PAGE_LOCATOR = "//a[contains(@class, 'enw-btn')]";
    #backToSiteButton = new Button(ConfirmEmailPage.#BACK_TO_MAIN_PAGE_LOCATOR);

    constructor() {
        super(ConfirmEmailPage.#BACK_TO_MAIN_PAGE_LOCATOR);
    }

    /**
     *Method to click on back to site.
     * @returns {Promise<void>}
     */
    async backToMainPage() {
        await this.#backToSiteButton.click();
    }
}

export default new ConfirmEmailPage();