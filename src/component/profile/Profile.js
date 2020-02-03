import * as React from "react";
import {withRouter} from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Alert from "../snackbar/Alert";
import loginBackground from '../../assets/login_back.jpg';

class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            alertOpen: false
        };
    }

    showAlert = (message) => {
        this.setState({
            alertOpen: true
        });
        if (message != null) this.setState({alertMessage: message});
    };

    hideAlert = () => {
        this.setState({
            alertOpen: false
        });
    };

    mainStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url(${loginBackground})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: "100vh"
    };

    render() {
        return (
            <Grid container style={this.mainStyle}>
                <Alert isOpen={this.state.alertOpen}
                       alertMessage={this.state.alertMessage}
                       handleClose={this.hideAlert}/>
            </Grid>
        );
    }
}

export default withRouter(Profile);


