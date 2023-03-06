import {Label} from "./framework/elements/label.js";
import {Button} from "./framework/elements/button.js";
import {TextBox} from "./framework/elements/text-box.js";

const {BasePage} = require("./base-page");

class UnsubscribePage extends BasePage {
    static #EMAIL_LOCATOR = '#email';
    #emailInput = new TextBox(UnsubscribePage.#EMAIL_LOCATOR);
    #confirmButton = new Button(`//button[@type = 'submit']`);
    #message = new Label(`//p//strong`);

    constructor() {
        super(UnsubscribePage.#EMAIL_LOCATOR);
    }

    async unsubscribe(email) {
        await this.#emailInput.typeText(email);
        await this.#confirmButton.click();
    }

    async isMessageShown() {
        return await this.#message.isVisible();
    }
}

export {UnsubscribePage};