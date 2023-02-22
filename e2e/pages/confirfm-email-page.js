const {BasePage} = require("./base-page");
const BACK_TO_MAIN_PAGE_LOCATOR = "//a[contains(@class, 'enw-btn')]";

class ConfirmEmailPage extends BasePage {
    constructor(page) {
        super(page, BACK_TO_MAIN_PAGE_LOCATOR);
        this.backToSiteButton = page.locator(BACK_TO_MAIN_PAGE_LOCATOR);
    }

    async goToPage(link) {
        await this.page.goto(link);
    }

    async backToMainPage() {
        await this.backToSiteButton.click();
    }
}

export {ConfirmEmailPage}