import * as React from "react";
import Grid from "@material-ui/core/Grid";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import EventNoteIcon from '@material-ui/icons/EventNote';
import SubjectIcon from '@material-ui/icons/Subject';

export class CreateSubjectItemDial extends React.Component{

    constructor(props, context) {
        super(props, context);
        this.state = {
            open: false,
            action: ''
        };
    }

    mainGridStyle = {
        marginLeft: "3vh",
        marginTop: "5vh"
    };

    actions = [
        {
            type: "scheduleDialog",
            icon: <EventNoteIcon/>,
            name: 'Add schedule',
            handle: el => this.props.handleChange(el.type)
        },
        {
            type: "subjectDialog",
            icon: <SubjectIcon/>,
            name: 'Add subject',
            handle: el => this.props.handleChange(el.type)
        }
    ];


    handleClose = () => {
        this.setState({open: false});
    };

    handleOpen = () => {
        this.setState({open: true});
    };

    render() {
        return (
            <Grid item style={this.mainGridStyle}>
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
            </Grid>
        );
    }

}
