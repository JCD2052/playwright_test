import {Button} from "../../framework/elements/button.js";
import {Link} from "../../framework/elements/link.js";
import SignUpForm from "./sign-up-form";

const {BasePage} = require("./base-page");


class NewsLetterPage extends BasePage {
    static #SELECT_BUTTON_LOCATOR = `//input[@name='newsletters[]']`;
    static #NEWSLETTERS_FORM_LOCATOR = `//form[@id ='newsletters-form']`
    static #TOPIC_LOCATOR = topicId => `(//label[@for=${topicId}])[1]`;
    static #TOPIC_LINK_LOCATOR = "//a";
    #newsTopics = new Link(`//div[@class = 'p-8']`);
    signUpForm = SignUpForm;

    constructor() {
        super(NewsLetterPage.#NEWSLETTERS_FORM_LOCATOR);
    }

    /**
     * Method which return random topic from page.
     * @returns {Promise<BaseElement>}
     */
    async findRandomTopic() {
        const topics = await this.#newsTopics.findElements();
        return topics[Math.floor(Math.random() * topics.length)];
    }

    /**
     *Method to get id from link object and click on it.
     * @param topicElement {Link} Link object with topic.
     * @returns {Promise<void>}
     */
    async selectTopic(topicElement) {
        const selectButton = topicElement.findNext(NewsLetterPage.#SELECT_BUTTON_LOCATOR);
        await selectButton.scrollToElement();
        const topicId = await selectButton.getElementId();
        const element = new Button(NewsLetterPage.#TOPIC_LOCATOR(topicId));
        await element.click();
    }

    /**
     *Method to scroll to element and getting a link attribute.
     * @param topicElement {Link} Link object with topic.
     * @returns {Promise<Link>}
     */
    async getPreviewElement(topicElement) {
        await topicElement.scrollToElement();
        return topicElement.findNext(NewsLetterPage.#TOPIC_LINK_LOCATOR);
    }
}

export default new NewsLetterPage();