import * as React from "react";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import CssBaseline from "@material-ui/core/CssBaseline";
import {ServiceProvider} from "../service/ServiceProvider";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Divider from '@material-ui/core/Divider';

export class Sidebar extends React.Component {

    securityService;

    constructor(props, context) {
        super(props, context);

        const provider = ServiceProvider.provider();
        this.securityService = provider.getService(provider.service.SECURITY_SERVICE);
    }

    avatarStyle = {
        margin: "10px",
        width: "100px",
        height: "100px",
        boxShadow: "0 0 10px rgba(0,0,0,0.5)"
    };

    render() {
        return (
            <div>
                <CssBaseline/>
                <Drawer variant="permanent" anchor="left">
                    <Grid container>
                        <Grid item>
                            <img src={require("../../assets/settings.svg")} alt="none"/>
                        </Grid>
                        <Avatar alt="Empty" src={require("../../assets/profile.svg")} style={this.avatarStyle}/>
                    </Grid>
                    <Divider/>
                    <List>
                        {this.securityService.currentUserTabs().map((item) => (
                            <ListItem button key={item.name}>
                                <ListItemText primary={item.name}/>
                            </ListItem>
                        ))}
                    </List>
                </Drawer>
            </div>
        );
    }
}

export default Sidebar;
