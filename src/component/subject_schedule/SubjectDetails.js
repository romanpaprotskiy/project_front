import * as React from "react";
import {Fade} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {GroupDetails} from "./GroupDetails";
import {TeachersList} from "./TeachersList";
import {ServiceProvider} from "../service/ServiceProvider";
import Errors from "../error/Errors";

export class SubjectDetails extends React.Component {

    subjectService;

    constructor(props, context) {
        super(props, context);
        const provider = ServiceProvider.provider();
        this.subjectService = provider.getService(provider.service.SUBJECT_SERVICE);
        this.state = {
            data: null
        };

    }

    getBySubject = (subjectId) => {
        return this.subjectService.getSubjectDetails(subjectId)
            .then(response => response.data)
            .then(data => this.setState({data: data}))
            .catch(reason => this.props.showAlert(Errors.getErrorMessage(reason)));
    };

    paperStyle = {
        marginLeft: "5vh",
        marginTop: "5vh",
        width: "80%"
    };

    render() {
        return (
            <Fade in={this.props.checked}>
                <Grid item container style={this.paperStyle}>
                    <Grid item container direction="column">
                        <GroupDetails/>
                        {this.state.data && this.state.data.teachers ?
                            <TeachersList data={this.state.data.teachers}/> : undefined}
                    </Grid>
                </Grid>
            </Fade>
        );
    }
}
