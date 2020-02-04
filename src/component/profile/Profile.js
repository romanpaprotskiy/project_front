import * as React from "react";
import {withRouter} from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Alert from "../snackbar/Alert";
import ProfileDetails from "./ProfileDetails";
import ProfileGeneral from "./ProfileGeneral";
import {StudentDetails} from "./StudentDetails";

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

    avatarStyle = {
        margin: "10px",
        width: "15vh",
        borderRadius: "50%",
        boxShadow: "0 0 10px rgba(0,0,0,0.5)"
    };

    render() {
        return (
            <Grid container direction="column" justify="flex-start" alignItems="flex-start"
                  style={this.props.mainStyle}>
                <Grid item>
                    <Grid item container direction="row">
                        <ProfileGeneral user={this.props.data.user} avatarStyle={this.avatarStyle}/>
                    </Grid>
                    <Grid item container direction="row">
                        <ProfileDetails user={this.props.data.user}/>
                        <StudentDetails student={this.props.data.student}/>
                    </Grid>
                </Grid>
                <Alert isOpen={this.state.alertOpen}
                       alertMessage={this.state.alertMessage}
                       handleClose={this.hideAlert}/>
            </Grid>
        );
    }
}

export default withRouter(Profile);


