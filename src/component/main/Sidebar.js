import * as React from "react";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import CssBaseline from "@material-ui/core/CssBaseline";
import {ServiceProvider} from "../service/ServiceProvider";
import Grid from "@material-ui/core/Grid";
import Divider from '@material-ui/core/Divider';
import {ListItemIcon} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Urls from "../../url";
import {withRouter} from "react-router";
import sidebarBackGround from '../../assets/sidebarBackground.jpeg';


export class Sidebar extends React.Component {

    securityService;

    constructor(props, context) {
        super(props, context);
        const provider = ServiceProvider.provider();
        this.securityService = provider.getService(provider.service.SECURITY_SERVICE);
        console.log(Urls.ROOT_URL);
        this.state = {
            selectedItem: 1
        };
    }

    avatarStyle = {
        margin: "10px",
        width: "15vh",
        borderRadius: "50%",
        boxShadow: "0 0 10px rgba(0,0,0,0.5)"
    };

    drawerStyle = {
        width: "27vh",
        backgroundImage: `url(${sidebarBackGround})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: "100vh"
    };

    render() {
        return (
            <div style={{display: "flex"}}>
                <CssBaseline/>
                <Drawer variant="permanent" anchor="left">
                    <Grid container direction="column" style={this.drawerStyle}>
                        <Grid container item direction="column" justify="center" alignItems="center">
                            <Grid item>
                                <img alt="Empty" src={this.props.user.pictureUrl} style={this.avatarStyle}/>
                            </Grid>
                            <Grid item style={{marginBottom: "10px"}}>
                                <Typography variant="h6" color="textPrimary">
                                    {this.props.user.firstName + " " + this.props.user.lastName}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Divider/>
                        <List>
                            {this.securityService.currentUserTabs().map((item) => (
                                <ListItem button key={item.name}
                                          onClick={() => {this.props.history.push(item.redirectUri)}}>
                                    <ListItemIcon><img src={item.icon} alt="Not found"/></ListItemIcon>
                                    <ListItemText primary={item.name}/>
                                </ListItem>
                            ))}
                        </List>
                        <Divider/>
                        <List>
                            <ListItem button onClick={() => this.props.history.push("/")}>
                                <ListItemIcon><img src={Urls.ROOT_URL + "/assets/signout.svg"}
                                                   alt="Not found"/></ListItemIcon>
                                <ListItemText primary="SignOut"/>
                            </ListItem>
                        </List>
                    </Grid>
                </Drawer>
            </div>
        );
    }
}

export default withRouter(Sidebar);
