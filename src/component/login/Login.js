import React from "react";
import GoogleLogin from 'react-google-login';
import Urls from "../../url";
import axios from "axios";
import Alert from "../snackbar/Alert";
import loginBackground from '../../assets/login_back.jpg';
import loginIcon from '../../assets/login.svg';
import Container from "@material-ui/core/Container";
import Success from "../snackbar/Success";

export class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            alertOpen: false,
            alertMessage: 'Authorize failed',
            successOpen: false,
            successMessage: "Authorize success"
        };
        this.showAlert = this.showAlert.bind(this);
        this.hideAlert = this.hideAlert.bind(this);
        this.authorize = this.authorize.bind(this);
        this.showSuccess = this.showSuccess.bind(this);
        this.hideSuccess = this.hideSuccess.bind(this);
    }

    mainStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url(${loginBackground})`,
        backgroundSize: "100%",
        height: "100vh"
    };

    loginBlockStyle = {
        height: "35%",
        padding: "5%",
        backgroundColor: 'rgba(214, 214, 214, 0.9)',
        borderRadius: "5%",
        boxShadow: "0 0 10px rgba(0,0,0,0.5)"
    };

    loginIconStyle = {
        height: "15%",
        margin: "10%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    };

    loginTextStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    };

    googleLoginStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    };

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

    showSuccess(message) {
        this.setState({
            successOpen: true
        });
        if (message != null) this.setState({successMessage: message});
    }

    hideSuccess() {
        this.setState({
            successOpen: false
        });
    }

    render() {
        return (
            <div style={this.mainStyle}>
                <Container maxWidth="xs">
                    <div style={this.loginBlockStyle}>
                        <img src={loginIcon} alt="Not found" style={this.loginIconStyle}/>
                        <h1 style={this.loginTextStyle}>Login</h1>
                        <div style={this.googleLoginStyle}>
                            <GoogleLogin
                                clientId="217658242103-pv74qrnmoku2aqhtgre77kutpfuk1sqe.apps.googleusercontent.com"
                                responseType="code" scope="https://www.googleapis.com/auth/calendar"
                                onSuccess={r => {
                                    this.authorize(r.code, Urls.ROOT_URL)
                                }}
                                onFailure={reason => this.showAlert(reason.toString())}/>
                        </div>
                    </div>
                </Container>
                <Alert isOpen={this.state.alertOpen}
                       alertMessage={this.state.alertMessage}
                       handleClose={this.hideAlert}/>
                <Success isOpen = {this.state.successOpen}
                         successMessage={this.state.successMessage}
                         handleClose={this.hideSuccess}/>
            </div>
        );
    }

    async authorize(authorizationCode, redirectUri) {
        await axios.post(Urls.BASE_URL + '/social/signin/google',
            {authCode: authorizationCode, redirectUri: redirectUri})
            .then(response => response.data)
            .then(response => localStorage.setItem("auth", JSON.stringify(response)))
            .then(this.showSuccess)
            .catch(reason => this.showAlert(reason.toString()));
    }
}

export default Login;
