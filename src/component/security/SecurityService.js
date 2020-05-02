import {Tab} from "./Tab";
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import PeopleIcon from '@material-ui/icons/People';
import EventIcon from '@material-ui/icons/Event';
import React from "react";

export class SecurityService {

    _tabs = [
        new Tab("Profile", ["GUEST", "STUDENT", "TEACHER", "ADMIN"],
            <AccountBoxIcon/>, "/main/profile"),
        new Tab("Management", ["TEACHER", "ADMIN"],
            <PeopleIcon/>, "/main/students"),
        new Tab("Subjects and Schedule", ["STUDENT", "TEACHER", "ADMIN"],
            <EventIcon/>, "/main/subjects"),
        new Tab("Events", ["STUDENT", "TEACHER", "ADMIN"],
            <EventIcon/>, "/main/events")
    ];

    currentUserTabs = () => {
        const authorities = JSON
            .parse(localStorage.getItem("auth"))
            .map(el => el.authority);
        return this._tabs
            .filter(item => this.currentUserHasAnyAuthority(authorities, item.authority));
    };

    currentUserHasAnyAuthority = (userAuthorities, requiredAuthorities) => {
        let hasAnyRequired = false;
        requiredAuthorities.forEach(el => {
            if (userAuthorities.includes(el)) hasAnyRequired = true;
        });
        return hasAnyRequired;
    };
}

export default SecurityService;
