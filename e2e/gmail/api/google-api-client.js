const fs = require('fs').promises;
const {authenticate} = require('@google-cloud/local-auth');
const {google} = require("googleapis");

const TYPE = 'authorized_user';

class GoogleApiAuthClient {

    /**
     *
     * @param config {GoogleApiConfig}
     */
    constructor(config) {
        this.config = config;
    }

    async loadSavedCredentialsIfExist() {
        try {
            const content = await fs.readFile(this.config.tokenPath);
            const credentials = JSON.parse(content.toString());
            return google.auth.fromJSON(credentials);
        } catch (err) {
            return null;
        }
    }

    async saveCredentials(client) {
        const content = await fs.readFile(this.config.credentialsPath);
        const keys = JSON.parse(content.toString());
        const key = keys.installed || keys.web;
        const payload = JSON.stringify({
            type: TYPE,
            client_id: key.client_id,
            client_secret: key.client_secret,
            refresh_token: client.credentials.refresh_token,
        });
        await fs.writeFile(this.config.tokenPath, payload);
    }

    /**
     *Returns a client which has been authorized into API.
     * @returns {Promise<JWT|UserRefreshClient|BaseExternalAccountClient|Impersonated|OAuth2Client>}
     */
    async authorize() {
        let client = await this.loadSavedCredentialsIfExist();
        if (client) {
            return client;
        }
        client = await authenticate({
            scopes: this.config.scopes,
            keyfilePath: this.config.credentialsPath,
        });
        if (client.credentials) {
            await this.saveCredentials(client);
        }
        return client;
    }
}

export {GoogleApiAuthClient}