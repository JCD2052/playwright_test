import {Button} from "./framework/elements/button.js";
import {Link} from "./framework/elements/link.js";
import {SignUpForm} from "./sign-up-form";

const {BasePage} = require("./base-page");


class NewsLetterPage extends BasePage {
    static #SELECT_BUTTON_LOCATOR = `//input[@name='newsletters[]']`;
    static #NEWSLETTERS_FORM_LOCATOR = `//form[@id ='newsletters-form']`
    static #TOPIC_LOCATOR = topicId => `(//label[@for=${topicId}])[1]`;
    static #TOPIC_LINK_LOCATOR = "//a";
    #newsTopics = new Link(`//div[@class = 'p-8']`);
    signUpForm = new SignUpForm();

    constructor() {
        super(NewsLetterPage.#NEWSLETTERS_FORM_LOCATOR);
    }

    async findRandomTopic() {
        const topics = await this.#newsTopics.findElements();
        return topics[Math.floor(Math.random() * topics.length)];
    }

    async selectTopic(topicElement) {
        const selectButton = topicElement.findNext(NewsLetterPage.#SELECT_BUTTON_LOCATOR);
        await selectButton.scrollToElement();
        const topicId = await selectButton.getElementId();
        const element = new Button(NewsLetterPage.#TOPIC_LOCATOR(topicId));
        await element.click();
    }

    async getPreviewElement(topicElement) {
        await topicElement.scrollToElement();
        return topicElement.findNext(NewsLetterPage.#TOPIC_LINK_LOCATOR);
    }
}

export {NewsLetterPage};