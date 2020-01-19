import * as React from "react";
import {withRouter} from "react-router-dom";
import Profile from "../profile/Profile";

class Main extends React.Component{

    render() {
        return (
            <Profile/>
        );
    }
}

export default withRouter(Main);
