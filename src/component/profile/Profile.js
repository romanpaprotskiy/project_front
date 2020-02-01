import * as React from "react";
import {withRouter} from "react-router-dom";
import axios from "axios";
import Urls from "../../url";
import Grid from "@material-ui/core/Grid";
import Alert from "../snackbar/Alert";
import Errors from "../error/Errors";

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

    getCurrentUserProfile() {
        const accessToken = localStorage.getItem("accessToken");
        return axios.get(Urls.BASE_V1_URL + '/profile/current', {
            headers: {
                Authorization: "Bearer " + accessToken
            }
        })
            .catch(error => this.showAlert(Errors.getErrorMessage(error)));
    }

    render() {
        return (
            <Grid container spacing={3}>
                <Alert isOpen={this.state.alertOpen}
                       alertMessage={this.state.alertMessage}
                       handleClose={this.hideAlert}/>
            </Grid>
        );
    }
}

export default withRouter(Profile);


