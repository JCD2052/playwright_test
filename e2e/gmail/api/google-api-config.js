class GoogleApiConfig {
    constructor(tokenPath, credentialsPath, scopes) {
        this._tokenPath = tokenPath;
        this._credentialsPath = credentialsPath;
        this._scopes = scopes;
    }


    get tokenPath() {
        return this._tokenPath;
    }

    get credentialsPath() {
        return this._credentialsPath;
    }

    get scopes() {
        return this._scopes;
    }
}

export {GoogleApiConfig}