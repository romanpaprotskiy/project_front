import * as React from "react";
import List from "@material-ui/core/List";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Checkbox from "@material-ui/core/Checkbox";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import PeopleIcon from '@material-ui/icons/People';
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';

export class AttendeesList extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            data: null
        }
        this.props.data()
            .then(data => data.filter(el => !this.props.selected.some(item => item.id === el.id)))
            .then(data => this.setState({data: data}));
    }

    onChangeToggle = (value) => {
        this.props.onSelect(value);
        this.props.data()
            .then(data => data.filter(el => !this.props.selected.some(item => item.id === el.id)))
            .then(data => this.setState({data: data}));
    };

    search = (event) => {
        this.props.onSearch(event.target.value)
            .then(data => data.filter(el => !this.props.selected.some(item => item.id === el.id)))
            .then(result => this.setState({data: result}));
    };

    render() {
        return (
            <Grid item container alignItems="center" alignContent="center">
                <TextField onChange={this.search}
                           style={{marginLeft: "1vh", marginBottom: "2vh"}}
                           id="outlined-basic" InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon/>
                        </InputAdornment>
                    ),
                }}/>
                {this.state.data &&
                    <List>
                        {this.state.data.map(el => {
                            return <ListItem key={el.id} dense button onClick={() => this.onChangeToggle(el)}>
                                <ListItemAvatar>
                                    <Avatar src={el.pictureUrl}/>
                                </ListItemAvatar>
                                <ListItemIcon>
                                    <PeopleIcon/>
                                </ListItemIcon>
                                <ListItemText primary={el.firstName + " " + el.lastName} secondary={el.email}/>
                                <ListItemSecondaryAction>
                                    <AddIcon/>
                                </ListItemSecondaryAction>
                            </ListItem>
                        })}
                    </List>}
            </Grid>
        );
    }
}
