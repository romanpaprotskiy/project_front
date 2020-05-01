import * as React from "react";
import Grid from "@material-ui/core/Grid";
import {withRouter} from "react-router";
import {SubjectsTable} from "./SubjectsTable";
import {SubjectDetails} from "./SubjectDetails";
import Alert from "../snackbar/Alert";
import Success from "../snackbar/Success";
import {ServiceProvider} from "../service/ServiceProvider";
import Errors from "../error/Errors";
import {CreateSubjectItemDial} from "./CreateSubjectItemDial";
import {SubjectDialog} from "./dialog/SubjectDialog";
import {ScheduleDialog} from "./dialog/ScheduleDialog";
import DateRangeIcon from '@material-ui/icons/DateRange';
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import {ScheduleCalendar} from "./ScheduleCalendar";


export class Subjects extends React.Component {

    subjectService;

    constructor(props, context) {
        super(props, context);
        this.state = {
            alertOpen: false,
            successOpen: false,
            detailsData: null,
            rightBlockType: "calendar",
            dialogOpen: false,
            dialogType: "",
            calendarData: []
        };
        const provider = ServiceProvider.provider();
        this.subjectService = provider.getService(provider.service.SUBJECT_SERVICE);
        this.getCalendarSchedules();
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

    onRowClick = (id) => {
        this.getBySubject(id);
    };

    getBySubject = (subjectId) => {
        this.subjectService.getSubjectDetails(subjectId)
            .then(response => response.data)
            .then(data => {
                this.setState({detailsData: data});
                this.setState({rightBlockType: "details"});
            })
            .catch(reason => this.showAlert(Errors.getErrorMessage(reason)));
    };

    getCalendarSchedules = () => {
        this.subjectService.getSchedulesByCurrentMonth()
            .then(response => response.data)
            .then(data => this.setState({calendarData: data}))
            .catch(reason => this.showAlert(Errors.getErrorMessage(reason)));
    };

    updateSubjectDetails = (subjectId) => {
        this.getBySubject(subjectId);
    };

    handleDialChange = (type) => {
        this.setState({dialogOpen: true, dialogType: type});
    };

    buttonStyle = {
        marginLeft: "3vh",
        marginTop: "5vh"
    };

    rightPanel = () => {
        switch (this.state.rightBlockType) {
            case "details":
                return <SubjectDetails checked={this.state.detailsData != null}
                                data={this.state.detailsData}
                                showSuccess={this.showSuccess}
                                showAlert={this.showAlert}
                                update={this.updateSubjectDetails}/>;
            case "calendar":
                return <ScheduleCalendar height={600} data={this.state.calendarData}/>;
        }
    };

    render() {
        return (
            <Grid container direction="column" justify="flex-start" alignItems="flex-start"
                  style={this.props.mainStyle}>
                <Grid item container direction="row" justify="flex-start" alignItems="flex-start">
                    <Grid item xs={5} container direction="column">
                        <Grid item style={{width: "90%"}}>
                            <CreateSubjectItemDial handleChange={this.handleDialChange}/>
                        </Grid>
                        <SubjectsTable checked={true}
                                       onRowClick={this.onRowClick}
                                       showAlert={this.showAlert}/>
                    </Grid>
                    <Grid item xs={7} container direction="column">
                        <Grid item container direction="row-reverse" style={{width: "85%"}}>
                            <Button style={this.buttonStyle} variant="contained"
                                    onClick={() => {
                                        this.getCalendarSchedules();
                                        this.setState({rightBlockType: "calendar"});
                                    }}>
                                <Grid item container>
                                    <Grid item xs={2}>
                                        <DateRangeIcon/>
                                    </Grid>
                                    <Grid item xs={10}>
                                        <Typography variant="button">Calendar view</Typography>
                                    </Grid>
                                </Grid>
                            </Button>
                        </Grid>
                        {this.rightPanel()}
                    </Grid>
                </Grid>
                <Alert isOpen={this.state.alertOpen}
                       alertMessage={this.state.alertMessage}
                       handleClose={this.hideAlert}/>
                <Success isOpen={this.state.successOpen}
                         successMessage={this.state.successMessage}
                         handleClose={this.hideSuccess}/>
                <SubjectDialog open={this.state.dialogOpen && this.state.dialogType === "subjectDialog"}
                               onClose={() => this.setState({dialogOpen: false})}
                               onSuccess={(message) => {
                                   this.setState({dialogOpen: false});
                                   this.showSuccess(message);
                               }}
                               showAlert={this.showAlert}/>
                <ScheduleDialog open={this.state.dialogOpen && this.state.dialogType === "scheduleDialog"}
                               onClose={() => this.setState({dialogOpen: false})}
                               onSuccess={(message) => {
                                   this.setState({dialogOpen: false});
                                   this.showSuccess(message);
                               }}
                               showAlert={this.showAlert}/>
            </Grid>
        );
    }
}

export default withRouter(Subjects);
