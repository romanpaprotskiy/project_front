import * as React from "react";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import Grid from "@material-ui/core/Grid";
import {CreateGroupForm} from "./CreateGroupForm";

export class NewStudentGroup extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            open: false,
            checked: false
        };
    }

    mainGridStyle = {
        marginLeft: "1vh",
        marginTop: "5vh"
    };

    actions = [
        {icon: <PersonAddIcon/>, name: 'Add student'},
        {icon: <GroupAddIcon/>, name: 'Add group'}
    ];

    handleClose = () => {
        this.setState({open: false});
    };

    handleOpen = () => {
        this.setState({open: true});
    };

    openCreate = () => {
        this.setState({open: false, checked: !this.state.checked});
    };

    render() {
        return (
            <Grid item container style={this.mainGridStyle}>
                <Grid item container direction="row-reverse" alignItems="flex-start"
                      justify="flex-start">
                    <SpeedDial ariaLabel="Add"
                               icon={<SpeedDialIcon/>}
                               onClose={this.handleClose}
                               onOpen={this.handleOpen}
                               open={this.state.open}
                               direction="left">
                        {this.actions.map(action => (
                            <SpeedDialAction
                                key={action.name}
                                icon={action.icon}
                                tooltipTitle={action.name}
                                onClick={this.openCreate}/>
                        ))}
                    </SpeedDial>
                    <Grid item container style={{marginRight: "5vh"}}>
                        <CreateGroupForm showAlert={this.props.showAlert} checked={this.state.checked}/>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}
