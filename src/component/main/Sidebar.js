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

export class Sidebar extends React.Component {

    securityService;

    constructor(props, context) {
        super(props, context);
        const provider = ServiceProvider.provider();
        this.securityService = provider.getService(provider.service.SECURITY_SERVICE);
    }

    avatarStyle = {
        width: "25%",
        margin: "5%",
        borderRadius: "50%",
        boxShadow: "0 0 10px rgba(0,0,0,0.5)"
    };

    render() {
        return (
            <div>
                <CssBaseline/>
                <Drawer variant="permanent" anchor="left">
                    <Grid container>
                        <Grid item>
                            <img alt="Empty" src={this.props.user.pictureUrl} style={this.avatarStyle}/>
                            <Typography variant="h6" color="textPrimary">
                                {this.props.user.firstName + " " + this.props.user.lastName}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Divider/>
                    <List>
                        {this.securityService.currentUserTabs().map((item) => (
                            <ListItem button key={item.name}>
                                <ListItemIcon><img src={item.icon} alt="Not found"/></ListItemIcon>
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
