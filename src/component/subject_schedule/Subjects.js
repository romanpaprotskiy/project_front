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

export class Subjects extends React.Component {

    subjectService;

    constructor(props, context) {
        super(props, context);
        this.state = {
            alertOpen: false,
            successOpen: false,
            detailsData: null,
            dialogOpen: false,
            dialogType: ""
        };
        const provider = ServiceProvider.provider();
        this.subjectService = provider.getService(provider.service.SUBJECT_SERVICE);
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
            .then(data => this.setState({detailsData: data}))
            .catch(reason => this.showAlert(Errors.getErrorMessage(reason)));
    };

    updateSubjectDetails = (subjectId) => {
        this.getBySubject(subjectId);
    };

    handleDialChange = (type) => {
        switch (type) {
            case "scheduleDialog":
                this.setState({dialogOpen: true, dialogType: type});
                break;
            case "subjectDialog":
                this.setState({dialogOpen: true, dialogType: type});
                break;
            default:
                break;
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
                        <Grid item style={{width: "90%"}}>
                            <CreateSubjectItemDial/>
                        </Grid>
                        <SubjectDetails checked={this.state.detailsData != null}
                                        data={this.state.detailsData}
                                        showSuccess={this.showSuccess}
                                        showAlert={this.showAlert}
                                        update={this.updateSubjectDetails}/>
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
