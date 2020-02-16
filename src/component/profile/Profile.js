import * as React from "react";
import {withRouter} from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Alert from "../snackbar/Alert";
import ProfileDetails from "./ProfileDetails";
import ProfileGeneral from "./ProfileGeneral";
import {StudentDetails} from "./StudentDetails";
import {ProfileScheduler} from "./ProfileScheduler";
import SubjectsList from "./SubjectsList";

class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            alertOpen: false,
            user: this.props.data.user
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

    componentDidMount() {
        const height = document.getElementById("left").clientHeight;
        this.setState({height});
    }

    updateProfileDetails = (data) => {
        this.setState({user: data});
    };

    avatarStyle = {
        margin: "10px",
        width: "15vh",
        borderRadius: "50%",
        boxShadow: "0 0 10px rgba(0,0,0,0.5)"
    };

    render() {
        return (
            <Grid container direction="row" justify="flex-start" alignItems="flex-start"
                  style={this.props.mainStyle}>
                <Grid item id="left">
                    <Grid item container direction="row">
                        <ProfileGeneral user={this.state.user} avatarStyle={this.avatarStyle}
                                        updateProfileDetails={this.updateProfileDetails}
                                        alert={this.showAlert}/>
                    </Grid>
                    <Grid item container direction="row">
                        <ProfileDetails user={this.state.user}/>
                        <StudentDetails student={this.props.data.student}/>
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
    }
}

export default withRouter(Profile);


