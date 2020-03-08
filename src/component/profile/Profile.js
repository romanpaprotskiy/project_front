import * as React from "react";
import {withRouter} from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Alert from "../snackbar/Alert";
import ProfileDetails from "./ProfileDetails";
import ProfileGeneral from "./ProfileGeneral";
import {StudentDetails} from "./StudentDetails";
import {ProfileScheduler} from "./ProfileScheduler";
import SubjectsList from "./SubjectsList";
import {CircularProgress} from "@material-ui/core";
import loginBackground from "../../assets/login_back.jpg";
import Errors from "../error/Errors";
import {ServiceProvider} from "../service/ServiceProvider";

class Profile extends React.Component {

    profileService;

    constructor(props) {
        super(props);
        this.state = {
            alertOpen: false,
            user: this.props.data.user
        };
        const provider = ServiceProvider.provider();
        this.profileService = provider.getService(provider.service.PROFILE_SERVICE);
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

    componentDidMount() {
        const height = document.getElementById("left").clientHeight;
        this.setState({height});
    }

    updateProfileDetails = (data) => {
        this.profileService.editCurrentUserProfile(data.birthDate.toISOString(),
            data.phone, data.skype)
            .then(response => response.data)
            .then(data => this.setState({user: data}))
            .catch(reason => this.showAlert(Errors.getErrorMessage(reason)));
    };

    avatarStyle = {
        margin: "10px",
        width: "15vh",
        borderRadius: "50%",
        boxShadow: "0 0 10px rgba(0,0,0,0.5)"
    };

    progressBackgroundStyle = {
        filter: "blur(8px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url(${loginBackground})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: "100vh"
    };

    progressStyle = {
        position: "absolute",
        top: "42%",
        left: "42%",
        zIndex: "2",
        marginLeft: "auto",
        marginRight: "auto"
    };

    getSubDetails = () => {
        if (this.props.data.student)
            return <StudentDetails student={this.props.data.student}/>;
        if (this.props.data.teacher)
            return null;//TODO teacher element
        return null;//TODO empty element
    };

    render() {
        if (this.state.user) {
            return (
                <Grid container direction="row" justify="flex-start" alignItems="flex-start"
                      style={this.props.mainStyle}>
                    <Grid item id="left">
                        <Grid item container direction="row">
                            <ProfileGeneral user={this.state.user} avatarStyle={this.avatarStyle}
                                            updateProfileDetails={this.updateProfileDetails}/>
                        </Grid>
                        <Grid item container direction="row">
                            <ProfileDetails user={this.state.user}/>
                            {this.getSubDetails()}
                        </Grid>
                        <Grid item>
                            <SubjectsList subjects={this.props.data.subjects}/>
                        </Grid>
                    </Grid>
                    <Grid item xs={6}>
                        <ProfileScheduler height={this.state.height}/>
                    </Grid>
                    <Alert isOpen={this.state.alertOpen}
                           alertMessage={this.state.alertMessage}
                           handleClose={this.hideAlert}/>
                </Grid>
            );
        } else {
            return (
                <div>
                    <div className="background" style={this.progressBackgroundStyle}/>
                    <CircularProgress size={125} style={this.progressStyle}/>
                </div>
            );
        }
    }
}

export default withRouter(Profile);


