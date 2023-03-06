import {BaseElement} from "./base-element.js";

class Link extends BaseElement {
    constructor(locator) {
        super(locator);
    }

    async getHref() {
        return super.getAttribute('href');
    }
}

export {Link}