const {google} = require("googleapis");

const MY_ID = 'me';

class GmailMessagesApiClient {

    /**
     *
     * @param authClient {GoogleApiAuthClient}
     */
    constructor(authClient) {
        this.client = authClient.authorize()
            .then(auth => google.gmail({version: 'v1', auth}).users.messages);
    }

    /**
     *Returns an array of messages from API.
     * @param params {any}
     * @returns {Promise<Awaited<Schema$MessagePart>[]>}
     */
    async getMessages(params = {
        userId: MY_ID,
        maxResults: 100,
    }) {
        const client = await this.client;
        const rawMessages = await client.list(params);
        return Promise.all(rawMessages.data.messages
            .map(async (rawMessage) =>
                await this.receiveMessageById(MY_ID, rawMessage.id)));
    }

    /**
     * Return a message payload from Gmail API by messageId
     * @param userId {string}
     * @param messageId {string}
     * @returns {Promise<Schema$MessagePart>}
     */
    async receiveMessageById(userId, messageId) {
        const client = await this.client;
        const messageObject = await client.get({
            userId: userId,
            id: messageId,
        });
        return messageObject.data.payload;
    }
}

export {GmailMessagesApiClient}