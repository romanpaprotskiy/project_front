export class Tab {
    _name;
    _authority;
    _icon;
    _redirectUri;

    constructor(name, authority, icon, redirectUri) {
        this._name = name;
        this._authority = authority;
        this._icon = icon;
        this._redirectUri = redirectUri;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get authority() {
        return this._authority;
    }

    set authority(value) {
        this._authority = value;
    }


    get icon() {
        return this._icon;
    }

    set icon(value) {
        this._icon = value;
    }


    get redirectUri() {
        return this._redirectUri;
    }

    set redirectUri(value) {
        this._redirectUri = value;
    }
}
