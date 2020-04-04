import * as React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import SubjectIcon from '@material-ui/icons/Subject';
import Typography from "@material-ui/core/Typography";
import DialogContent from "@material-ui/core/DialogContent";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import {ServiceProvider} from "../../service/ServiceProvider";
import Errors from "../../error/Errors";

export class SubjectDialog extends React.Component {

    subjectService;

    constructor(props, context) {
        super(props, context);
        this.state = {
            name: "",
            courseNumber: ""
        };
        const provider = ServiceProvider.provider();
        this.subjectService = provider.getService(provider.service.SUBJECT_SERVICE);
    }

    save = () => {
        const request = {
            name: this.state.name,
            courseNumber: this.state.courseNumber
        };
        this.subjectService.createSubject(request)
            .then(() => this.props.onSuccess("Subject was created"))
            .catch(reason => this.props.showAlert(Errors.getErrorMessage(reason)));
    };

    render() {
        return (
            <Dialog open={this.props.open} onClose={this.props.onClose}>
                <DialogTitle>
                    <Grid container direction="row">
                        <SubjectIcon/>
                        <Typography style={{marginLeft: "1vh"}}>
                            Add new subject
                        </Typography>
                    </Grid>
                </DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="name"
                        label="Name"
                        onChange={event => this.setState({name: event.target.value})}
                        fullWidth
                    />
                    <TextField
                        required
                        margin="dense"
                        id="courseNumber"
                        label="Course number"
                        onChange={event => this.setState({courseNumber: event.target.value})}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => this.save()} color="primary">
                        Save
                    </Button>
                    <Button onClick={this.props.onClose} color="secondary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}
