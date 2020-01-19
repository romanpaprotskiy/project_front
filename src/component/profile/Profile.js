import * as React from "react";
import ProfileHeader from "./ProfileHeader";
import {withRouter} from "react-router-dom";
import axios from "axios";
import Urls from "../../url";
import Grid from "@material-ui/core/Grid";
import Alert from "../snackbar/Alert";

class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            alertOpen: false
        };
        this.showAlert = this.showAlert.bind(this);
        this.hideAlert = this.hideAlert.bind(this);
    }

    componentDidMount() {
        this.getCurrentUserProfile();
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

    getErrorMessage(error) {
        if (error.response) {
            return error.response.data.message;
        } else return error.toString();
    }

    getCurrentUserProfile() {
        const accessToken = localStorage.getItem("accessToken");
        console.log(accessToken);
        return axios.get(Urls.BASE_URL + '/profile/current', {
            headers: {
                Authorization: "Bearer " + accessToken
            }
        })
            .then(response => console.log(response))
            .catch(error => this.showAlert(this.getErrorMessage(error)));
    }

    render() {
        return (
            <Grid container spacing={3}>
                <ProfileHeader/>
                <Alert isOpen={this.state.alertOpen}
                       alertMessage={this.state.alertMessage}
                       handleClose={this.hideAlert}/>
            </Grid>
        );
    }
}

export default withRouter(Profile);


