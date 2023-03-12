import {PageHolder} from "../../framework/browser/page-holder";

/**
 * Class for Base Page.
 */
class BasePage {
    #locator

    /**
     *Constructor with a unique page locator.
     * @param locator{string} string locator.
     */
    constructor(locator) {
        this.#locator = locator;
    }

    /**
     *Method for waiting until page is loading.
     * @returns {Promise<void>}
     */

    async waitForLoading() {
        await PageHolder.page.waitForLoadState();
    }

    /**
     *Method which check if page is opened.
     * @returns {Promise<boolean>}
     */

    async isPageOpened() {
        return PageHolder.page.locator(this.#locator).isVisible();
    }
}

export {BasePage}