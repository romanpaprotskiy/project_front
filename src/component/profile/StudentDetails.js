import * as React from "react";
import {ListItemAvatar, ListItemText, Paper} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import GroupIcon from '@material-ui/icons/Group';
import Avatar from "@material-ui/core/Avatar";
import EventIcon from "@material-ui/icons/Event";
import backgroundPaper from "../../assets/sidebarBackground.jpeg";

export class StudentDetails extends React.Component {

    paperStyle = {
        marginLeft: "5vh",
        marginTop: "5vh",
        backgroundImage: `url(${backgroundPaper})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover"
    };

    render() {
        return (
            <Paper elevation={5} style={this.paperStyle}>
                <Grid container direction="row" style={{margin: "1vh"}}>
                    <List>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <GroupIcon color="action"/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={"Group: " + this.props.student.group.parent?.name}/>
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <GroupIcon color="action"/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={"Subgroup: " + this.props.student.group.name}/>
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <EventIcon color="action"/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={"Date of starts: " + new Date(this.props.student.dateOfEnroll)
                                .toLocaleDateString()}/>
                        </ListItem>
                    </List>
                </Grid>
            </Paper>
        );
    }
}
