import * as React from "react";
import Grid from "@material-ui/core/Grid";
import {withRouter} from "react-router";
import {SubjectsTable} from "./SubjectsTable";
import {SubjectDetails} from "./SubjectDetails";
import Alert from "../snackbar/Alert";
import Success from "../snackbar/Success";

export class Subjects extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            selectedSubjectId: "",
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

    render() {
        return (
            <Grid container direction="row" justify="flex-start" alignItems="flex-start"
                  style={this.props.mainStyle}>
                <Grid item xs={4} container direction="column">
                    <SubjectsTable checked={true}
                                   onRowClick={(id) => this.setState({selectedSubjectId: id})}
                                   showAlert={this.showAlert}/>
                </Grid>
                <Grid item xs={8} container direction="column">
                    <SubjectDetails checked={true}
                                    id={this.state.selectedSubjectId}
                                    showAlert={this.showAlert}/>
                </Grid>
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

export default withRouter(Subjects);
