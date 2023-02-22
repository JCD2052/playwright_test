class BasePage {
    constructor(page, pageMarker) {
        this.page = page;
        this.pageMarker = pageMarker;
    }

    async waitForLoading() {
        await this.page.waitForLoadState();
    }

    async isPageOpened() {
        return await this.page.locator(this.pageMarker).isVisible();
    }
}

export {BasePage}