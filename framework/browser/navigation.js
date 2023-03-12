import {PageHolder} from "./page-holder";

/**
 * Utility class for browser navigation.
 */
class Navigation {

    /**
     *Method to go to some page.
     * @param url{string} url string.
     * @returns {Promise<void>}
     */
    static async goToPage(url) {
        await PageHolder.page.goto(url);
    }
}

export {Navigation}