import {TextBox} from "./framework/elements/text-box.js";
import {Button} from "./framework/elements/button.js";

class SignUpForm {
    #emailTextInput = new TextBox(`//input[@type='email']`);
    #submitButton = new Button(`//input[@data-event='NL_submit']`);

    constructor() {

    }

    async subscribeToTopic(email) {
        await this.#emailTextInput.typeText(email);
        await this.#submitButton.click();
    }

    async isFormOpened() {
        return this.#emailTextInput.isVisible();
    }
}

export default new SignUpForm();