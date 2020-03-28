import * as React from "react";
import Grid from "@material-ui/core/Grid";
import loginIcon from "../../assets/login.svg";
import GoogleLogin from "react-google-login";
import {Paper} from "@material-ui/core";

export class LoginForm extends React.Component {

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

    render() {
        return (
            <Paper style={this.loginBlockStyle}>
                <Grid container direction="column" style={{padding: "5vh"}}>
                    <img src={loginIcon} alt="Not found" style={this.loginIconStyle}/>
                    <h1 style={this.loginTextStyle}>SignIn</h1>
                    <Grid item>
                        <GoogleLogin
                            clientId="217658242103-pv74qrnmoku2aqhtgre77kutpfuk1sqe.apps.googleusercontent.com"
                            responseType="code" scope="https://www.googleapis.com/auth/calendar"
                            onSuccess={this.props.authorize}
                            onFailure={this.props.showAlert}/>
                    </Grid>
                </Grid>
            </Paper>
        );
    }
}
