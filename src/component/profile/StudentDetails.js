import * as React from "react";
import {Paper} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";

export class StudentDetails extends React.Component{

    render() {
        return (
            <Paper elevation={5} style={this.props.paperStyle}>
                <Grid container direction="row">
                    <List>

                    </List>
                </Grid>
            </Paper>
        );
    }
}
