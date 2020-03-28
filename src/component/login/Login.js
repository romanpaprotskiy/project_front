import React from "react";
import Urls from "../../url";
import Alert from "../snackbar/Alert";
import Success from "../snackbar/Success";
import {withRouter} from "react-router-dom";
import Errors from "../error/Errors";
import {ServiceProvider} from "../service/ServiceProvider";
import Grid from "@material-ui/core/Grid";
import {LoginForm} from "./LoginForm";

export class Login extends React.Component {

    loginService;

    constructor(props) {
        super(props);
        this.state = {
            alertOpen: false,
            alertMessage: 'Authorize failed',
            successOpen: false,
            successMessage: "Authorize success",
        };

        const provider = ServiceProvider.provider();
        this.loginService = provider.getService(provider.service.LOGIN_SERVICE);
    }

    showAlert = (message) => {
        this.setState({
            alertOpen: true
        });
        if (message != null) this.setState({alertMessage: Errors.getErrorMessage(message)});
    };

    hideAlert = () => {
        this.setState({
            alertOpen: false
        });
    };

    showSuccess = (message) => {
        this.setState({
            successOpen: true
        });
        if (message != null) this.setState({successMessage: message});
    };

    hideSuccess = () => {
        this.setState({
            successOpen: false
        });
    };

    redirectToMain = () => {
        this.props.history.push("/main/profile");
    };

    render() {
        return (
            <Grid container direction="row" alignItems="center" justify="center" style={{height: "100%", width: "100%"}}>
                <Grid item>
                    <LoginForm authorize={r => this.authorize(r.code, Urls.ROOT_URL)}
                               showAlert={this.showAlert}/>
                </Grid>
                <Alert isOpen={this.state.alertOpen}
                       alertMessage={this.state.alertMessage}
                       handleClose={this.hideAlert}/>
                <Success isOpen={this.state.successOpen}
                         successMessage={this.state.successMessage}
                         handleClose={this.hideSuccess}/>
            </Grid>
        );
    }

    setAuth(response) {
        localStorage.setItem("accessToken", response.accessToken);
        localStorage.setItem("refreshToken", response.refreshToken);
        localStorage.setItem("expiryDate", response.expiryDate);
        localStorage.setItem("auth", JSON.stringify(response.authorities));
    }

    authorize(authorizationCode) {
        this.loginService.authorize(authorizationCode)
            .then(response => response.data)
            .then(response => this.setAuth(response))
            .then(this.showSuccess)
            .then(this.redirectToMain)
            .catch(reason => this.showAlert(Errors.getErrorMessage(reason)));
    }
}

export default withRouter(Login);
