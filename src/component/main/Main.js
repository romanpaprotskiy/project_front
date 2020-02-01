import * as React from "react";
import {withRouter} from "react-router-dom";
import Profile from "../profile/Profile";
import Sidebar from "./Sidebar";
import {Container} from "@material-ui/core";

class Main extends React.Component {

    render() {
        return (
            <Container>
                <Sidebar/>
                <Profile/>
            </Container>
        );
    }
}

export default withRouter(Main);
