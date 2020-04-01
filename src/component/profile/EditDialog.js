import * as React from "react";
import {Dialog, DialogActions, DialogContent, DialogTitle} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import PersonIcon from '@material-ui/icons/Person';
import Grid from "@material-ui/core/Grid";
import {KeyboardDatePicker} from "@material-ui/pickers";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import moment from "moment";

export class EditDialog extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            birthDate: props.user.birthDate ? new Date(props.user.birthDate) : null,
            phone: props.user.phone,
            skype: props.user.skypeId
        };
    }

    handleSave = () => {
        this.props.update({birthDate: this.state.birthDate,
            phone: this.state.phone,skype: this.state.skype});
        this.props.handleClose();
    };

    formControlStyle = {
        width: "100%",
        marginBottom: "2vh"
    };

    setBirthDate = (date) => {
        let changedDate = moment.utc(date);
        this.setState({birthDate: changedDate});
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
                    <Grid container direction="column" alignItems="flex-start" justify="center">
                        <KeyboardDatePicker disableFuture
                                            openTo="year"
                                            format="DD/MM/YYYY"
                                            label="Date of birth"
                                            views={["year", "month", "date"]}
                                            value={this.state.birthDate}
                                            onChange={this.setBirthDate}
                                            style={this.formControlStyle}/>
                        <FormControl style={this.formControlStyle}>
                            <Input
                                placeholder="Phone"
                                value={this.state.phone}
                                onChange={(e) =>
                                    this.setState({phone: e.target.value})}
                            />
                        </FormControl>
                        <FormControl style={this.formControlStyle}>
                            <Input
                                placeholder="Skype"
                                value={this.state.skype}
                                onChange={(e) =>
                                    this.setState({skype: e.target.value})}
                            />
                        </FormControl>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleSave} color="primary" variant="contained">
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
