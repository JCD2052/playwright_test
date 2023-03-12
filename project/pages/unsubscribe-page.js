import {Label} from "../../framework/elements/label.js";
import {Button} from "../../framework/elements/button.js";
import {TextBox} from "../../framework/elements/text-box.js";

const {BasePage} = require("./base-page");

class UnsubscribePage extends BasePage {
    static #EMAIL_LOCATOR = '#email';
    #emailInput = new TextBox(UnsubscribePage.#EMAIL_LOCATOR);
    #confirmButton = new Button(`//button[@type = 'submit']`);
    #message = new Label(`//p//strong`);

    constructor() {
        super(UnsubscribePage.#EMAIL_LOCATOR);
    }

    /**
     * Method to type an email and click submit button.
     * @param email {string} email string.
     * @returns {Promise<void>}
     */
    async unsubscribe(email) {
        await this.#emailInput.typeText(email);
        await this.#confirmButton.click();
    }

    /**
     * Method to check if alert is opened.
     * @returns {Promise<boolean>}
     */
    async isMessageShown() {
        return await this.#message.isVisible();
    }
}

export default new UnsubscribePage();