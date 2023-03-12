import {TextBox} from "../../framework/elements/text-box.js";
import {Button} from "../../framework/elements/button.js";

class SignUpForm {
    #emailTextInput = new TextBox(`//input[@type='email']`);
    #submitButton = new Button(`//input[@data-event='NL_submit']`);

    constructor() {

    }

    /**
     * Method to type an email and click submit.
     * @param email {string} email String.
     * @returns {Promise<void>}
     */
    async subscribeToTopic(email) {
        await this.#emailTextInput.typeText(email);
        await this.#submitButton.click();
    }

    /**
     * Method which check if form is opened.
     * @returns {Promise<boolean>}
     */
    async isFormOpened() {
        return this.#emailTextInput.isVisible();
    }
}

export default new SignUpForm();