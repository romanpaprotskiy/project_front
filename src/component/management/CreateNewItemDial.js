import * as React from "react";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import SpeedDial from "@material-ui/lab/SpeedDial";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import Grid from "@material-ui/core/Grid";

export class CreateNewItemDial extends React.Component {


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
            type: "studentDialog",
            icon: <PersonAddIcon/>,
            name: 'Add student',
            handle: el => this.props.handleChange(el.type)
        },
        {
            type: "groupDialog", icon: <GroupAddIcon/>, name: 'Add group', handle: el => {
                this.props.handleChange(el.type);
                console.log(el);
            }
        },
        {
            type: "teacherDialog",
            icon: <PersonAddIcon/>,
            name: 'Add teacher',
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


export default CreateNewItemDial;
