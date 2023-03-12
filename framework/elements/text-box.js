import {BaseElement} from "./base-element.js";

/**
 *Class for TextBox element.
 */
class TextBox extends BaseElement {
    /**
     *Super constructor from {Base Element} class.
     * @param locator {string} Locator of element.
     */
    constructor(locator) {
        super(locator);
    }

    /**
     * Method for clear input.
     * @returns {Promise<void>}
     */
    async clear() {
        await (await super._findElement()).clear();
    }


    /**
     * Method to type text into input field.
     * @param value {string} Text value.
     * @returns {Promise<void>}
     */
    async typeText(value) {
        await (await super._findElement()).fill(value);
    }
}

export {TextBox}