import {BaseElement} from "./base-element.js";

class TextBox extends BaseElement {
    constructor(locator) {
        super(locator);
    }

    async clear() {
        await (await super._findElement()).clear();
    }


    async typeText(value) {
        await (await super._findElement()).fill(value);
    }

    async clearAndType(value) {
        await this.clear();
        await this.typeText(value);
    }
}

export {TextBox}