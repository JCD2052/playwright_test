import {getElementSelector} from "../utils/element-utils.js";
import {PageHolder} from "../browser/page-holder";

/**
 * Class for Frame object.
 */
class Frame {
    #locator

    /**
     * Base constructor with locator string.
     * @param locator {string} Frame locator.
     */
    constructor(locator) {
        this.#locator = locator;
    }

    /**
     *Method for enter inside frame.
     * @returns {import('@playwright/test').FrameLocator}
     */
    async goToFrame() {
        return PageHolder.page.frameLocator(this.#locator);
    }

    /**
     *Method to extract element from Frame.
     * @param locator{string} Element locator.
     * @param ElementType{class} Class type.
     * @returns {Promise<BaseElement>} Return object with ElementType type.
     */
    async getElementFromFrame(locator, ElementType) {
        const webElement = (await this.goToFrame()).locator(locator);
        return new ElementType(getElementSelector(webElement));
    }
}

export {Frame}
