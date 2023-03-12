import {MessageInfo} from "../message-info";

const FROM_EMAIL_HEADER_TAG = "From";
const DATE_HEADER_TAG = "Date";

/**
 *Return a message info object from a message payload.
 * @param payload Schema$MessagePart
 * @returns MessageInfo
 */
function getMessageInfoFromMessage(payload) {
    const body = decodeFromBase64(findBodyInMessagePayload(payload));
    const headers = payload.headers;
    const from = headers.filter(header => header.name === FROM_EMAIL_HEADER_TAG)?.[0].value; // use regex
    const time = headers.filter(header => header.name === DATE_HEADER_TAG)?.[0].value;
    return new MessageInfo(body, from, new Date(time))
}

/**
 *Return a decoded base64 encoded string.
 * @param text {string}
 * @returns {string}
 */
function decodeFromBase64(text) {
    return Buffer.from(text, 'base64').toString()
}

/**
 *Look for a body in payload of message and return it or return an empty string.
 * @param payload {Schema$MessagePart}
 * @returns {string}
 */
function findBodyInMessagePayload(payload) {
    const fromParts = payload.parts?.[0]?.body.data;
    const fromBody = payload.body?.data;
    return fromBody ?? fromParts ?? "";

}

export {getMessageInfoFromMessage}