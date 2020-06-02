import * as React from "react";
import Fade from "@material-ui/core/Fade";
import List from "@material-ui/core/List";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Checkbox from "@material-ui/core/Checkbox";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import PeopleIcon from '@material-ui/icons/People';
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";

export class RestrictionList extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            data: null,
            selected: []
        }
        this.props.data().then(data => this.setState({data: data}));
    }

    onChangeToggle = (value) => {
        let selected = this.state.selected;
        if (selected.indexOf(value) !== -1)
            selected.splice(selected.indexOf(value), 1);
        else selected.push(value);
        this.setState({selected: selected});
    };

    render() {
        return (
            <Fade in={this.props.value === this.props.index}>
                <List>
                    {this.state.data ? this.state.data.map(el => {
                        return (<ListItem key={el.id} dense button onClick={() => this.onChangeToggle(el)}>
                                <ListItemAvatar>
                                    <Avatar src={el.pictureUrl}/>
                                </ListItemAvatar>
                                <ListItemIcon>
                                    <PeopleIcon/>
                                </ListItemIcon>
                                <ListItemText primary={el.firstName + " " + el.lastName} secondary={el.email}/>
                                <ListItemSecondaryAction>
                                    <Checkbox
                                        edge="start"
                                        checked={this.state.selected.some(e => e.id === el.id)}
                                        tabIndex={-1}
                                        disableRipple
                                    />
                                </ListItemSecondaryAction>
                            </ListItem>
                        )
                    }) : "Wait..."}
                </List>
            </Fade>
        );
    }
}
