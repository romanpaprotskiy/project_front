import * as React from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import EventIcon from "@material-ui/icons/Event";
import {ListItemText} from "@material-ui/core";
import PhoneIcon from "@material-ui/icons/Phone";
import ChatIcon from "@material-ui/icons/Chat";
import backgroundPaper from "../../assets/sidebarBackground.jpeg";

export class ProfileDetails extends React.Component {

    paperStyle = {
        marginLeft: "5vh",
        marginTop: "5vh",
        backgroundImage: `url(${backgroundPaper})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover"
    };

    nullCheck = (value) => {
        return value ? value : " - ";
    };

    getDate = (date) => {
        return date ? new Date(date).toLocaleDateString() : " - ";
    };

    render() {
        return (
            <Paper elevation={5} style={this.paperStyle}>
                <Grid container direction="row" style={{margin: "2vh"}}>
                    <List>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <EventIcon color="action"/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={"Date of birth: " + this.getDate(this.props.user.birthDate)}/>
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <PhoneIcon color="action"/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={"Phone: " + this.nullCheck(this.props.user.phone)}/>
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <ChatIcon color="action"/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={"Skype: " + this.nullCheck(this.props.user.skypeId)}/>
                        </ListItem>
                    </List>
                </Grid>
            </Paper>
        );
    }
}

export default ProfileDetails;
