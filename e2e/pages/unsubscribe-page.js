const {BasePage} = require("./base-page");
const EMAIL_LOCATOR = '#email';

class UnsubscribePage extends BasePage {
    constructor(page) {
        super(page, EMAIL_LOCATOR);
        this.emailInput = page.locator(EMAIL_LOCATOR);
        this.confirmButton = page.locator(`//button[@type = 'submit']`);
        this.message = page.locator(`//p//strong`);
    }

    async unsubscribe(email) {
        await this.emailInput.fill(email);
        await this.confirmButton.click();
    }

    async isMessageShown() {
        return await this.message.isVisible();
    }
}

export {UnsubscribePage}