import {PageHolder} from "./page-holder";

class Navigation {

    /**
     *
     * @param url
     * @returns {Promise<void>}
     */
    static async goToPage(url) {
        await PageHolder.page.goto(url);
    }
}

export {Navigation}