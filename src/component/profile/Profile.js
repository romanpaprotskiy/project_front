import * as React from "react";
import {withRouter} from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Alert from "../snackbar/Alert";
import loginBackground from '../../assets/login_back.jpg';
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

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
        margin: "5vh"
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
                    <Paper elevation={5} style={this.paperStyle}>
                        <Grid container spacing={2} direction="row" justify="flex-start" alignItems="flex-start">
                            <Grid item>
                                <img alt="Empty" src={this.props.user.pictureUrl} style={this.avatarStyle}/>
                            </Grid>
                            <Grid item style={{margin: "2vh"}}>
                                <Grid item container direction="column">
                                    <Typography variant="h4" gutterBottom color="textPrimary">
                                        {this.props.user.firstName + " " + this.props.user.lastName}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant="h6" gutterBottom color="textSecondary">
                                        {this.props.user.email}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                    <Paper elevation={5} style={this.paperStyle}>
                        <Grid container direction="row" xs>
                            <Grid item container direction="column">
                                <Typography variant="h6" gutterBottom color="textPrimary">
                                    Date of birth: {new Date(this.props.user.birthDate).toLocaleDateString()}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Alert isOpen={this.state.alertOpen}
                       alertMessage={this.state.alertMessage}
                       handleClose={this.hideAlert}/>
            </Grid>
        );
    }
}

export default withRouter(Profile);


