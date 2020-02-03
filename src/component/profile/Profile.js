import * as React from "react";
import {withRouter} from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Alert from "../snackbar/Alert";
import loginBackground from '../../assets/login_back.jpg';
import backgroundPaper from '../../assets/sidebarBackground.jpeg';
import ProfileDetails from "./ProfileDetails";
import ProfileGeneral from "./ProfileGeneral";

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
        backgroundImage: `url(${loginBackground})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: "100vh",
        marginLeft: "27vh",
        width: "calc(100% - 27vh)"
    };

    paperStyle = {
        marginLeft: "5vh",
        marginTop: "5vh",
        backgroundImage: `url(${backgroundPaper})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover"
    };

    avatarStyle = {
        margin: "10px",
        width: "15vh",
        borderRadius: "50%",
        boxShadow: "0 0 10px rgba(0,0,0,0.5)"
    };

    render() {
        return (
            <Grid container direction="column" justify="flex-start" alignItems="flex-start" style={this.mainStyle}>
                <Grid item container direction="row">
                    <ProfileGeneral user={this.props.data.user} paperStyle={this.paperStyle}
                                    avatarStyle={this.avatarStyle}/>
                </Grid>
                <Grid item container direction="row">
                    <ProfileDetails paperStyle={this.paperStyle} user={this.props.data.user}/>
                </Grid>
                <Alert isOpen={this.state.alertOpen}
                       alertMessage={this.state.alertMessage}
                       handleClose={this.hideAlert}/>
            </Grid>
        );
    }
}

export default withRouter(Profile);


