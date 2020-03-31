import * as React from "react";
import Grid from "@material-ui/core/Grid";
import {withRouter} from "react-router";
import {SubjectsTable} from "./SubjectsTable";
import {SubjectDetails} from "./SubjectDetails";

export class Subjects extends React.Component {

    render() {
        return (
            <Grid container direction="row" justify="flex-start" alignItems="flex-start"
                  style={this.props.mainStyle}>
                <Grid item xs={4} container direction="column">
                    <SubjectsTable checked={true}/>
                </Grid>
                <Grid item xs={8} container direction="column">
                    <SubjectDetails checked={true}/>
                </Grid>
            </Grid>
        );
    }
}

export default withRouter(Subjects);
