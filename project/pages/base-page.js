import {PageHolder} from "../../framework/browser/page-holder";

class BasePage {
    #locator

    /**
     *
     * @param locator{string}
     */
    constructor(locator) {
        this.#locator = locator;
    }

    /**
     *
     * @returns {Promise<void>}
     */

    async waitForLoading() {
        await PageHolder.page.waitForLoadState();
    }

    /**
     *
     * @returns {Promise<boolean>}
     */

    async isPageOpened() {
        return PageHolder.page.locator(this.#locator).isVisible();
    }
}

export {BasePage}