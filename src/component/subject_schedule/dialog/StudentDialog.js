import * as React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import DialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";
import PeopleIcon from '@material-ui/icons/People';
import Grid from "@material-ui/core/Grid";

export class StudentDialog extends React.Component {

    render() {
        return (
            <Dialog open={this.props.open} onClose={this.props.onClose}
                    style={{maxHeight: "50vh", marginTop: "20vh"}}>
                <DialogTitle>
                    <Grid container direction="row">
                        <PeopleIcon/>
                        <Typography style={{marginLeft: "1vh"}}>
                            Students
                        </Typography>
                    </Grid>
                </DialogTitle>
                <DialogContent>
                    <List>
                        {this.props.data.map((item, index) => (
                            <ListItem key={index}>
                                <ListItemAvatar>
                                    <Avatar src={item.user.pictureUrl}
                                            alt={item.user.firstName + " " + item.user.lastName}/>
                                </ListItemAvatar>
                                <ListItemText primary={item.user.firstName + " " + item.user.lastName}
                                              secondary={item.user.email}/>
                            </ListItem>
                        ))}
                    </List>
                </DialogContent>
            </Dialog>
        );
    }
}
