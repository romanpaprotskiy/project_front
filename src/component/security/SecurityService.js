import {Tab} from "./Tab";
import Urls from "../../url";

export class SecurityService {

    constructor() {
        this.currentUserHasAnyAuthority = this.currentUserHasAnyAuthority.bind(this);
        this.currentUserTabs = this.currentUserTabs.bind(this);
    }

    _tabs = [
        new Tab("Profile", ["GUEST", "STUDENT", "TEACHER", "ADMIN"], Urls.ROOT_URL + "/assets/profile.svg")
    ];

    currentUserTabs() {
        const authorities = JSON
            .parse(localStorage.getItem("auth"))
            .map(el => el.authority);
        return this._tabs
            .filter(item => this.currentUserHasAnyAuthority(authorities, item.authority));
    }

    currentUserHasAnyAuthority(userAuthorities, requiredAuthorities) {
        let hasAnyRequired = false;
        requiredAuthorities.forEach(el => {
            if (userAuthorities.includes(el)) hasAnyRequired = true;
        });
        return hasAnyRequired;
    }
}

export default SecurityService;
