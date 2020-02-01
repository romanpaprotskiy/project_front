export class Tab {
    _name;
    _authority;
    _icon;

    constructor(name, authority, icon) {
        this._name = name;
        this._authority = authority;
        this._icon = icon;
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
}
