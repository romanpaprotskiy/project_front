import * as React from "react";
import Grid from "@material-ui/core/Grid";
import {Paper} from "@material-ui/core";
import {withRouter} from "react-router-dom";

class ProfileHeader extends React.Component {

    gridStyle = {
        margin: "10px"
    };

    paperStyle = {
        display: "flex",
        float: "left"
    };

    render() {
        return (
                <Grid style={this.gridStyle} item>
                    <Paper elevation={3} style={this.paperStyle}>
                        Test
                    </Paper>
                </Grid>
        );
    }
}

export default withRouter(ProfileHeader);
