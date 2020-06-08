import * as React from "react";
import Grid from "@material-ui/core/Grid";
import {EventsCalendar} from "./EventsCalendar";
import {ViewTabs} from "./ViewTabs";
import {EventsTable} from "./EventsTable";
import AddIcon from '@material-ui/icons/Add';
import Fab from "@material-ui/core/Fab";
import EditIcon from '@material-ui/icons/Edit';
import {EventDialog} from "./dialog/EventDialog";
import Alert from "../snackbar/Alert";
import Success from "../snackbar/Success";

export class Events extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            tabValue: "calendar",
            open: false,
            dialogOpen: false,
            alertOpen: false,
            successOpen: false
        };
    }

    showAlert = (message) => {
        this.setState({
            alertOpen: true
        });
        if (message != null) this.setState({alertMessage: message});
    };

    hideSuccess = () => {
        this.setState({
            successOpen: false
        });
    };

    showSuccess = (message) => {
        this.setState({
            successOpen: true
        });
        if (message != null) this.setState({successMessage: message});
    };

    hideAlert = () => {
        this.setState({
            alertOpen: false
        });
    };

    switchView = () => {
        switch (this.state.tabValue) {
            case "calendar":
                return <EventsCalendar height={630} checked={this.state.tabValue === "calendar"}/>;
            case "list":
                return <EventsTable checked={this.state.tabValue === "list"}/>;
            default:
                return undefined;
        }
    };

    blockStyle = {
        marginLeft: "5vh",
        marginTop: "5vh",
        marginRight: "5vh",
        width: "85%"
    };

    render() {
        return (
            <Grid item container direction="column" style={this.props.mainStyle}>
                <ViewTabs value={this.state.tabValue}
                          onChange={newValue => this.setState({tabValue: newValue})}/>
                <Grid item container direction="row-reverse" style={this.blockStyle}>
                    <Fab color="primary" aria-label="add"
                         onClick={() => this.setState({dialogOpen: true})}>
                        <AddIcon/>
                    </Fab>
                </Grid>
                {this.switchView()}
                <EventDialog open={this.state.dialogOpen}
                             onClose={() => this.setState({dialogOpen: false})}/>
                <Alert isOpen={this.state.alertOpen}
                       alertMessage={this.state.alertMessage}
                       handleClose={this.hideAlert}/>
                <Success isOpen={this.state.successOpen}
                         successMessage={this.state.successMessage}
                         handleClose={this.hideSuccess}/>
            </Grid>
        );
    }
}
