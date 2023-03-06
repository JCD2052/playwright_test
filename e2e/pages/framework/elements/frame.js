import {getElementSelector} from "./utils.js";
import {PageHolder} from "../browser/page-holder";

class Frame {
    #locator

    constructor(locator) {
        this.#locator = locator;
    }

    /**
     *
     * @returns {import('@playwright/test').FrameLocator}
     */
    async goToFrame() {
        return PageHolder.page.frameLocator(this.#locator);
    }

    /**
     *
     * @param locator{string}
     * @param ElementType{class}
     * @returns {Promise<BaseElement>}
     */
    async getElementFromFrame(locator, ElementType) {
        const webElement = (await this.goToFrame()).locator(locator);
        return new ElementType(getElementSelector(webElement));
    }
}

export {Frame}
