import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Notify from "./Notify";

class Alert extends React.Component {

    render() {
        return (
            <div>
                <Snackbar open={this.props.isOpen} autoHideDuration={6000} onClose={this.props.handleClose}>
                    <Notify onClose={this.props.handleClose} severity="error">
                        {this.props.alertMessage}
                    </Notify>
                </Snackbar>
            </div>
        );
    }
}

export default Alert;
