import * as React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import Notify from "./Notify";

class Success extends React.Component{

    render() {
        return (
            <Snackbar open={this.props.isOpen} autoHideDuration={6000} onClose={this.props.handleClose}>
                <Notify onClose={this.props.handleClose} severity="success">
                    {this.props.successMessage}
                </Notify>
            </Snackbar>
        );
    }
}

export default Success;
