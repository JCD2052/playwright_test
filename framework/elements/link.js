import {BaseElement} from "./base-element.js";

/**
 * Class for Link element.
 */
class Link extends BaseElement {
    static #HREF_TAG_NAME = 'href';

    /**
     *Super constructor from {Base Element} class.
     * @param locator {string} Locator of element.
     */
    constructor(locator) {
        super(locator);
    }

    /**
     * Method for get href attribute.
     * @returns {Promise<string|null>} Return string or null if there is no href attribute.
     */
    async getHref() {
        return super.getAttribute(Link.#HREF_TAG_NAME);
    }
}

export {Link}