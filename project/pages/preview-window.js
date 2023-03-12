import {Frame} from "../../framework/elements/frame.js";
import {Link} from "../../framework/elements/link.js";
import {Navigation} from "../../framework/browser/navigation";

class PreviewWindow {
    #frame
    static #LINK_LOCATOR = `//a[contains(@href, 'unsubscribe')]`;

    /**
     *
     * @param previewId {string} Topic id.
     */
    constructor(previewId) {
        this.#frame = new Frame(`${previewId} iframe`);
    }

    /**
     * Method to get href from link element and go this link.
     * @returns {Promise<void>}
     */
    async goToUnsubscribe() {
        const link = await this.#frame.getElementFromFrame(PreviewWindow.#LINK_LOCATOR, Link);
        await link.waitToBeVisible();
        await link.scrollToElement();
        const url = await link.getHref();
        await Navigation.goToPage(url);
    }
}

export {PreviewWindow}