import * as React from "react";
import {withRouter} from "react-router-dom";
import Profile from "../profile/Profile";
import Sidebar from "./Sidebar";
import {Container} from "@material-ui/core";
import Errors from "../error/Errors";
import {ServiceProvider} from "../service/ServiceProvider";
import Alert from "../snackbar/Alert";

class Main extends React.Component {

    profileService;

    constructor(props, context) {
        super(props, context);
        this.showAlert = this.showAlert.bind(this);
        this.hideAlert = this.hideAlert.bind(this);
        const provider = ServiceProvider.provider();
        this.profileService = provider.getService(provider.service.PROFILE_SERVICE);
        this.state = {
            alertOpen: false
        };
    }

    componentDidMount() {
        this.profileService.getCurrentUserProfile()
            .then(response => response.data.user)
            .catch(error => this.showAlert(Errors.getErrorMessage(error)))
            .then(data => this.setState({
                user: data
            }));
    }

    showAlert(message) {
        this.setState({
            alertOpen: true
        });
        if (message != null) this.setState({alertMessage: message});
    }

    hideAlert() {
        this.setState({
            alertOpen: false
        });
    }

    render() {
        return (
            <Container>
                {this.state.user ? <Sidebar user={this.state.user}/> : <h1>Wait</h1>}
                <Profile/>
                <Alert isOpen={this.state.alertOpen}
                       alertMessage={this.state.alertMessage}
                       handleClose={this.hideAlert}/>
            </Container>
        );
    }
}

export default withRouter(Main);
