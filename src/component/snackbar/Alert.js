import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Error from "./Error";
import { makeStyles } from '@material-ui/core/styles';

class Alert extends React.Component {

    classes = () => makeStyles(theme => ({
        root: {
            width: '100%',
            '& > * + *': {
                marginTop: theme.spacing(2),
            },
        },
    }));

    render() {
        return (
            <div className={this.classes.root}>
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
