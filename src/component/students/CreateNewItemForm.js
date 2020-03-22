import * as React from "react";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import Grid from "@material-ui/core/Grid";
import {CreateGroupForm} from "./CreateGroupForm";

export class CreateNewItemForm extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            open: false,
            action: ''
        };
    }

    mainGridStyle = {
        marginLeft: "1vh",
        marginTop: "5vh"
    };

    actions = [
        {icon: <PersonAddIcon/>, name: 'Add student', handle: el => this.setState({action: el.name})},
        {icon: <GroupAddIcon/>, name: 'Add group', handle: el => this.setState({action: el.name})}
    ];

    handleClose = () => {
        this.setState({open: false});
    };

    handleOpen = () => {
        this.setState({open: true});
    };

    switchForm = () => {
        if (this.state.action !== '') {
            switch (this.state.action) {
                case 'Add student':
                    return null;// TODO
                case 'Add group':
                    return <CreateGroupForm
                        showAlert={this.props.showAlert}
                        showSuccess={this.props.showSuccess}
                        checked={this.state.action === 'Add group'}
                        update={() => {
                            this.setState({open: false, action: ''});
                        }}/>;
                default: return undefined;
            }
        }
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
                                onClick={() => action.handle(action)}
                                title={action.name}/>
                        ))}
                    </SpeedDial>
                    <Grid item container style={{marginRight: "5vh"}}>
                        {this.switchForm()}
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}
