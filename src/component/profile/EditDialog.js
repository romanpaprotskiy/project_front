import * as React from "react";
import {Dialog, DialogActions, DialogContent, DialogTitle} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import PersonIcon from '@material-ui/icons/Person';
import Grid from "@material-ui/core/Grid";
import {MuiPickersUtilsProvider, KeyboardDatePicker} from "@material-ui/pickers";
import moment from '@date-io/moment';
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";

export class EditDialog extends React.Component {

    profileService;

    constructor(props, context) {
        super(props, context);
        this.state = {
            birthDate: new Date(props.user.birthDate),
            phone: props.user.phone,
            skype: props.user.skypeId
        };

    }

    formControlStyle = {
        width: "100%",
        marginBottom: "2vh"
    };

    render() {
        return (
            <Dialog open={this.props.open} onClose={this.handleClose}>
                <DialogTitle>
                    <Grid container direction="row">
                        <PersonIcon color="action" style={{marginRight: "1vh"}}/>
                        <Typography variant="h6">Edit profile info</Typography>
                    </Grid>
                </DialogTitle>
                <DialogContent>
                    <MuiPickersUtilsProvider utils={moment}>
                        <Grid container direction="column" alignItems="flex-start" justify="center">
                            <KeyboardDatePicker disableFuture
                                        openTo="year"
                                        format="DD/MM/YYYY"
                                        label="Date of birth"
                                        views={["year", "month", "date"]}
                                        value={this.state.birthDate}
                                        onChange={(e) => this.setState({birthDate: e})}
                                        style={this.formControlStyle}/>
                            <FormControl style={this.formControlStyle}>
                                <Input
                                    value={this.state.phone}
                                    onChange={(e) =>
                                        this.setState({phone: e.target.value})}
                                />
                            </FormControl>
                            <FormControl style={this.formControlStyle}>
                                <Input
                                    value={this.state.skype}
                                    onChange={(e) =>
                                        this.setState({skype: e.target.value})}
                                />
                            </FormControl>
                        </Grid>
                    </MuiPickersUtilsProvider>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.handleClose} color="primary" variant="contained">
                        Save
                    </Button>
                    <Button onClick={this.props.handleClose} color="secondary" variant="contained">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default EditDialog;
