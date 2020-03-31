import * as React from "react";
import {Fade, Paper} from "@material-ui/core";
import backgroundPaper from "../../assets/sidebarBackground.jpeg";
import Grid from "@material-ui/core/Grid";

export class SubjectDetails extends React.Component {

    paperStyle = {
        marginLeft: "5vh",
        marginTop: "5vh",
        width: "80%",
        backgroundImage: `url(${backgroundPaper})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover"
    };

    render() {
        return (
            <Fade in={this.props.checked}>
                <Grid item>
                    <Paper style={this.paperStyle}>

                    </Paper>
                </Grid>
            </Fade>
        );
    }
}
