import * as React from "react";
import Grid from "@material-ui/core/Grid";
import Alert from "../snackbar/Alert";
import StudentsTable from "./StudentsTable";

export class Students extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            alertOpen: false,
        };
    }

    showAlert = (message) => {
        this.setState({
            alertOpen: true
        });
        if (message != null) this.setState({alertMessage: message});
    };

    hideAlert = () => {
        this.setState({
            alertOpen: false
        });
    };

    render() {
        return (
            <Grid container direction="column" justify="flex-start" alignItems="flex-start"
                  style={this.props.mainStyle}>
                <Grid item container direction="row" justify="flex-start" alignItems="flex-start">
                    <Grid item>
                        <StudentsTable showAlert={this.showAlert}/>
                    </Grid>
                </Grid>
                <Alert isOpen={this.state.alertOpen}
                       alertMessage={this.state.alertMessage}
                       handleClose={this.hideAlert}/>
            </Grid>
        );
    }
}
