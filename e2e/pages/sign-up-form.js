class SignUpForm {
    constructor(page) {
        this.emailTextInput = page.locator(`//input[@type='email']`);
        this.submitButton = page.locator(`//input[@data-event='NL_submit']`);
    }

    async subscribeToTopic(email) {
        await this.emailTextInput.fill(email);
        await this.submitButton.click();
    }
}

export {SignUpForm}