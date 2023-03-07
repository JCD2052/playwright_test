class PageHolder {
    static #page;

    /**
     *Store a page object for global using.
     * @param page {import('@playwright/test').Page}
     */
    static set page(page) {
        PageHolder.#page = page;
    }

    /**
     * Return stored Page object.
     * @returns {import('@playwright/test').Page}
     */
    static get page() {
        return PageHolder.#page;
    }
}

export {PageHolder}