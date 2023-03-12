import {getElementSelector} from "../utils/element-utils.js";
import {PageHolder} from "../browser/page-holder";

/**
 *Basic class for element objects which contains basic logic for every element.
 */
class BaseElement {
    #elementLocator;

    /**
     *Locator for element.
     * @param elementLocator {string}
     */
    constructor(elementLocator) {
        this.#elementLocator = elementLocator;
    }


    /**
     *Protected method to find element.
     * @returns {import('@playwright/test').Locator}
     */
    _findElement() {
        return PageHolder.page.locator(this.#elementLocator);
    }

    /**
     *Method to find next nested elements.
     * @param locator {string} locator string.
     * @returns {BaseElement}
     */
    findNext(locator) {
        const baseLocator = getElementSelector(this._findElement());
        return new this.constructor(getElementSelector(
            PageHolder.page.locator(baseLocator).locator(locator)));
    }

    /**
     *Method to find elements and return an array.
     * @returns {Promise<BaseElement[]>} Array of elements.
     */
    async findElements() {
        return (await this._findElement().all()).map((element) => {
            return new this.constructor(getElementSelector(element));
        });
    }

    /**
     *Method to click on element.
     * @returns {Promise<void>}
     */
    async click() {
        await (await this._findElement()).click();
    }

    /**
     *Method to get attribute from element.
     * @param attributeName {string} Attribute name.
     * @returns {Promise<string | null>} Return string or null if attribute has been not found.
     */
    async getAttribute(attributeName) {
        return (await this._findElement()).getAttribute(attributeName);
    }

    /**
     *Method to get id attribute from element.
     * @returns {Promise<string|null>} Return string or null if attribute has been not found.
     */
    async getElementId() {
        return this.getAttribute("id");
    }

    /**
     *Method to check if element is visible.
     * @returns {Promise<boolean>}
     */
    async isVisible() {
        return (await this._findElement()).isVisible();
    }

    /**
     *Method to scroll to element.
     * @returns {Promise<void>}
     */
    async scrollToElement() {
        await (await this._findElement()).scrollIntoViewIfNeeded();
    }

    /**
     * Method to wait until element is visible.
     * @param timeout {number} Time to wait. Default is 10 second.
     * @returns {Promise<void>}
     */
    async waitToBeVisible(timeout = 10) {
        await this._findElement().waitFor({state: "visible", timeout});
    }
}

export {BaseElement}