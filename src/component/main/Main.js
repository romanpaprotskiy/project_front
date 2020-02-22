import * as React from "react";
import {Route, withRouter} from "react-router-dom";
import Profile from "../profile/Profile";
import Sidebar from "./Sidebar";
import Errors from "../error/Errors";
import {ServiceProvider} from "../service/ServiceProvider";
import Alert from "../snackbar/Alert";
import {CircularProgress} from "@material-ui/core";
import loginBackground from "../../assets/login_back.jpg";
import {Switch} from "react-router";

class Main extends React.Component {

    profileService;

    constructor(props, context) {
        super(props, context);
        const provider = ServiceProvider.provider();
        this.profileService = provider.getService(provider.service.PROFILE_SERVICE);
        this.state = {
            alertOpen: false
        };
    }

    redirectToLogin() {
        setTimeout(() => {
            this.props.history.push("/");
        }, 3000);
    }

    componentDidMount() {
        this.profileService.getCurrentUserProfile()
            .then(response => response.data)
            .catch(error => {
                this.showAlert(Errors.getErrorMessage(error));
                this.redirectToLogin();
            })
            .then(data => this.setState({
                userData: data
            }));
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

    render() {
        if (this.state.userData)
            return (
                <div style={{display: "flex"}}>
                    <Sidebar user={this.state.userData.user}/>
                    <Switch>
                        <Route path="/main/profile"
                               component={() => <Profile data={this.state.userData} mainStyle={this.mainStyle}/>}/>
                    </Switch>
                    <Alert isOpen={this.state.alertOpen}
                           alertMessage={this.state.alertMessage}
                           handleClose={this.hideAlert}/>
                </div>
            );
        else {
            return (
                <div>
                    <div className="background" style={this.progressBackgroundStyle}/>
                    <CircularProgress size={125} style={this.progressStyle}/>
                    <Alert isOpen={this.state.alertOpen}
                           alertMessage={this.state.alertMessage}
                           handleClose={this.hideAlert}/>
                </div>
            );
        }
    }
}

export default withRouter(Main);
