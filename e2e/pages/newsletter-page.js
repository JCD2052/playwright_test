const {SignUpForm} = require('./sign-up-form');
const {BasePage} = require("./base-page");

const SELECT_BUTTON_LOCATOR = `//input[@name='newsletters[]']`;
const NEWSLETTERS_FORM_LOCATOR = `//form[@id ='newsletters-form']`
class NewsLetterPage extends BasePage {
    constructor(page) {
        super(page, NEWSLETTERS_FORM_LOCATOR);
        this.newsTopics = page.locator(`//div[@class = 'p-8']`)
        this.signUpForm = new SignUpForm(page);
    }

    async findRandomTopic() {
        const topics = await this.newsTopics.all();
        return topics[Math.floor(Math.random() * topics.length)];
    }

    async selectTopic(topicElement) {
        const selectButton = topicElement.locator(SELECT_BUTTON_LOCATOR);
        await selectButton.scrollIntoViewIfNeeded();
        const topicId = await selectButton.getAttribute('id');
        await this.page.locator(`//label[@for=${topicId}]`).first().click();
    }

    async getPreviewElement(topicElement) {
        await topicElement.scrollIntoViewIfNeeded();
        return topicElement.locator("//a");
    }
}

export {NewsLetterPage}