import {JSDOM} from "jsdom";
import {GoogleApiConfig} from "../../../project/gmail/api/google-api-config";
import ApiConfig from "../../../project/config/config.json";
import {GoogleApiAuthClient} from "../../../project/gmail/api/google-api-client";
import {GmailMessagesApiClient} from "../../../project/gmail/api/gmail-api-client";
import {getMessageInfoFromMessage} from "../../../project/gmail/api/utils/message-utils";

const FROM_TO_SEARCH = 'euronews';

/**
 * Parse href from html message body and return link as String.
 * @param messageInfo {MessageInfo}
 * @returns {string}
 */
function getConfirmationLinkFromMessage(messageInfo) {
    const parsedMessage = new JSDOM(messageInfo.bodyText).window.document;

    return Array.from(parsedMessage.querySelectorAll('a'))
        .map(node => node.href)
        .filter(linkText => linkText !== undefined)
        .find(Boolean);
}


/**
 * Function which returns an array of MessageInfo which are from EuroNews.
 * @returns {Promise<MessageInfo[]>}
 */
async function getEuronewsEmails() {
    const apiAuthConfig = new GoogleApiConfig(ApiConfig.tokenPath,
        ApiConfig.credentialsPath, ApiConfig.scopes)
    const authClient = new GoogleApiAuthClient(apiAuthConfig);
    const gmailApiClient = new GmailMessagesApiClient(authClient);
    const payloads = await gmailApiClient.getMessages();
    const messages = payloads.map(payload => getMessageInfoFromMessage(payload));
    return messages.filter(messageInfo => messageInfo.messageFrom.toLowerCase().includes(FROM_TO_SEARCH))
        .sort((messageInfo1, messageInfo2) =>
            messageInfo2.timeReceived.getTime() - messageInfo1.timeReceived.getTime());
}

export {
    getConfirmationLinkFromMessage,
    getEuronewsEmails
}