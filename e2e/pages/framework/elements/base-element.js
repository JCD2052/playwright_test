import {getElementSelector} from "./utils.js";
import {PageHolder} from "../browser/page-holder";

class BaseElement {
    #elementLocator;

    /**
     *
     * @param elementLocator {string}
     */
    constructor(elementLocator) {
        this.#elementLocator = elementLocator;
    }


    /**
     *
     * @returns {import('@playwright/test').Locator}
     */
    _findElement() {
        return PageHolder.page.locator(this.#elementLocator);
    }

    /**
     *
     * @param locator {string}
     * @returns {BaseElement}
     */

    findNext(locator) {
        const baseLocator = getElementSelector(this._findElement());
        return new this.constructor(getElementSelector(
            PageHolder.page.locator(baseLocator).locator(locator)));
    }

    /**
     *
     * @returns {Promise<BaseElement[]>}
     */

    async findElements() {
        return (await this._findElement().all()).map((element) => {
            return new this.constructor(getElementSelector(element));
        });
    }

    /**
     *
     * @returns {Promise<void>}
     */
    async click() {
        await (await this._findElement()).click();
    }

    /**
     *
     * @param attributeName {string}
     * @returns {Promise<string | null>}
     */
    async getAttribute(attributeName) {
        return (await this._findElement()).getAttribute(attributeName);
    }

    /**
     *
     * @returns {Promise<string|null>}
     */
    async getElementId() {
        return this.getAttribute("id");
    }

    /**
     *
     * @returns {Promise<string | null>}
     */
    async getText() {
        return (await this._findElement()).textContent();
    }

    /**
     *
     * @returns {Promise<boolean>}
     */
    async isVisible() {
        return (await this._findElement()).isVisible();
    }

    /**
     *
     * @returns {Promise<void>}
     */
    async scrollToElement() {
        await (await this._findElement()).scrollIntoViewIfNeeded();
    }

    async waitToBeVisible() {
        await this._findElement().waitFor({state: "visible"})
    }
}

export {BaseElement}