const UNSUBSCRIBE_LINK = `//a[contains(@href, 'unsubscribe')]`;

class PreviewWindow {
    constructor(page, previewId) {
        this.page = page;
        this.frame = page.frameLocator(`${previewId} iframe`);
    }

    async goToUnsubscribe() {
        const link = await this.frame.locator(UNSUBSCRIBE_LINK);
        await link.waitFor({state: "visible"})
        await link.scrollIntoViewIfNeeded();
        await this.page.goto(await link.getAttribute('href'));
    }
}

export {PreviewWindow}