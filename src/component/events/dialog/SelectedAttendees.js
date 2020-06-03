import * as React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import PeopleIcon from "@material-ui/icons/People";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ClearIcon from '@material-ui/icons/Clear';

export class SelectedAttendees extends React.Component {

    render() {
        return (
            <Grid item container alignItems="center" alignContent="center">
                {this.props.data &&
                <List>
                    {this.props.data.map(el => {
                        return <ListItem key={el.id} dense button onClick={() => this.props.onSelect(el)}>
                            <ListItemAvatar>
                                <Avatar src={el.pictureUrl}/>
                            </ListItemAvatar>
                            <ListItemIcon>
                                <PeopleIcon/>
                            </ListItemIcon>
                            <ListItemText primary={el.firstName + " " + el.lastName} secondary={el.email}/>
                            <ListItemSecondaryAction>
                                <ClearIcon/>
                            </ListItemSecondaryAction>
                        </ListItem>
                    })}
                </List>}
            </Grid>
        );
    }

}
