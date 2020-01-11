import React from "react";
import GoogleLogin from 'react-google-login';
import './login.css';
import Urls from "../../url";
import axios from "axios";
import Alert from "../snackbar/Alert";

export class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            alertOpen: false,
            alertMessage: 'Authorize failed'
        };
        this.showAlert = this.showAlert.bind(this);
        this.hideAlert = this.hideAlert.bind(this);
        this.authorize = this.authorize.bind(this);
    }

    showAlert(message) {
        this.setState({
            alertOpen: true
        });
        if (message != null) this.setState({alertMessage: message});
        console.log(this.state);
    }

    hideAlert() {
        this.setState({
            alertOpen: false
        });
    }

    render() {
        return (
            <div>
                <div className='loginBlock'>
                    <GoogleLogin
                        clientId="217658242103-pv74qrnmoku2aqhtgre77kutpfuk1sqe.apps.googleusercontent.com"
                        responseType="code" scope="https://www.googleapis.com/auth/calendar"
                        onSuccess={r => {
                            this.authorize(r.code, Urls.ROOT_URL);
                        }}
                        onFailure={reason => this.showAlert(reason.toString())}/>
                </div>
                <Alert isOpen={this.state.alertOpen}
                       alertMessage={this.state.alertMessage}
                       handleClose={this.hideAlert}/>
            </div>
        );
    }

    async authorize(authorizationCode, redirectUri) {
        console.log(authorizationCode);
        const response = await axios.post(Urls.BASE_URL + '/social/signin/google',
            {authCode: authorizationCode, redirectUri: redirectUri})
            .then(response => response.data)
            .catch(reason => this.showAlert(reason.toString()));
        localStorage.setItem("auth", JSON.stringify(response));
    }
}

export default Login;
