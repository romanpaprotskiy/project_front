import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Error from "./Error";

class Alert extends React.Component {

    render() {
        return (
            <div>
                <Snackbar open={this.props.isOpen} autoHideDuration={6000} onClose={this.props.handleClose}>
                    <Error onClose={this.props.handleClose} severity="error">
                        {this.props.alertMessage}
                    </Error>
                </Snackbar>
            </div>
        );
    }
}

export default Alert;
