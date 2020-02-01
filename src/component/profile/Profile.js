import * as React from "react";
import {withRouter} from "react-router-dom";
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
            <Grid container spacing={3}>
                <Alert isOpen={this.state.alertOpen}
                       alertMessage={this.state.alertMessage}
                       handleClose={this.hideAlert}/>
            </Grid>
        );
    }
}

export default withRouter(Profile);


