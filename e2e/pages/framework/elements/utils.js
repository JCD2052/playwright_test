import {substringAfterChar} from "../../../utils/string-utils.js";

const LOCATOR_BEFORE_CHARACTERS = "Locator@";

/**
 *
 * @param locator {import('@playwright/test').Locator}
 * @returns {string}
 */
function getElementSelector(locator) {
    return substringAfterChar(locator._selector, LOCATOR_BEFORE_CHARACTERS);
}


export {getElementSelector}