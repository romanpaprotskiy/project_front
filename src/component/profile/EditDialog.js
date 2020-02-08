import * as React from "react";
import {Dialog, DialogActions, DialogContent, DialogTitle} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

export class EditDialog extends React.Component {

    constructor(props) {
        super(props);
        this.state = {open: this.props.open};
    }

    handleClose = () => {
        this.setState({open: false});
    };

    render() {
        return (
            <div>
                <Dialog open={this.state.open} fullScreen={true} onClose={this.handleClose}>
                    <DialogTitle>
                        <Typography>Edit profile info</Typography>
                    </DialogTitle>
                    <DialogContent>
                        Test
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Save
                        </Button>
                        <Button onClick={this.handleClose} color="secondary">
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default EditDialog;
