import {substringAfterChar} from "./string-utils.js";

const LOCATOR_BEFORE_CHARACTERS = "Locator@";

/**
 *Method to extract string locator from element.
 * @param locator {import('@playwright/test').Locator}
 * @returns {string} String locator.
 */
function getElementSelector(locator) {
    return substringAfterChar(locator._selector, LOCATOR_BEFORE_CHARACTERS);
}


export {getElementSelector}