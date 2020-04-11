import * as React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import EventNoteIcon from '@material-ui/icons/EventNote';
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import TeacherSelect from "../../management/select/TeacherSelect";
import {RootGroupSelect} from "../../management/select/RootGroupSelect";
import {KeyboardDatePicker, KeyboardTimePicker} from "@material-ui/pickers";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import TextField from "@material-ui/core/TextField";
import {SubjectSelect} from "../select/SubjectSelect";
import {ServiceProvider} from "../../service/ServiceProvider";
import Errors from "../../error/Errors";

export class ScheduleDialog extends React.Component {

    subjectService;

    constructor(props, context) {
        super(props, context);
        this.state = {
            teacherId: "",
            groupId: "",
            subjectId:"",
            frequency: "",
            restriction: "",
            startDate: null,
            startTime: null,
            endTime: null,
            saveClicked: false,
            endDate: null,
            count: ""
        };
        const provider = ServiceProvider.provider();
        this.subjectService = provider.getService(provider.service.SUBJECT_SERVICE);
    }

    save = () => {
        const request = {
            teacherId: this.state.teacherId,
            groupId: this.state.groupId,
            subjectId: this.state.subjectId,
            startDate: new Date(this.state.startDate).toISOString(),
            startTime: new Date(this.state.startTime).toLocaleTimeString(),
            endTime: new Date(this.state.endTime).toLocaleTimeString(),
            interval: this.state.interval,
            restriction: {
                restrictionType: this.state.restrictionType,
                count: this.state.count,
                endDate: this.state.endDate
            }
        };
        this.subjectService.createSchedule(request)
            .then(() => this.props.onSuccess("Schedule created succesfully"))
            .catch(reason => this.props.showAlert(Errors.getErrorMessage(reason)));
        this.setState({
            teacherId: "",
            groupId: "",
            subjectId:"",
            frequency: "",
            restriction: "",
            startDate: null,
            startTime: null,
            endTime: null,
            saveClicked: false,
            endDate: null,
            count: ""
        });
        this.props.onClose();
    };

    handleChangeRadioRestriction = (event) => {
        this.setState({restriction: event.target.value});
    };

    close = () => {
        this.setState({
            teacherId: "",
            groupId: "",
            frequency: "",
            startDate: null,
            startTime: null,
            endTime: null,
            saveClicked: false
        });
        this.props.onClose();
    };

    selectTeacher = (value) => {
        this.setState({teacherId: value ? value.id : ""});
    };

    selectGroup = (value) => {
        this.setState({groupId: value ? value.id : ""});
    };

    selectSubject = (value) => {
        this.setState({subjectId: value ? value.id : ""});
    };

    formGridStyle = {
        margin: "1vh",
        width: "40vh"
    };

    switchForm = () => {
        switch (this.state.restriction) {
            case "END_DATE":
                return <KeyboardDatePicker
                    style={{width: "80%"}}
                    disableToolbar
                    autoOk
                    variant="inline"
                    inputVariant="outlined"
                    format="DD/MM/YYYY"
                    label="End date"
                    value={this.state.endDate}
                    onChange={(date) => this.setState({endDate: date})}
                    InputAdornmentProps={{position: "start"}}
                />
            case "COUNT":
                return <TextField
                    required
                    margin="dense"
                    label="Count of events"
                    helperText="Max events that could be happened"
                    style={{width: "80%"}}
                    onChange={event => this.setState({count: event.target.value})}
                    error={this.state.saveClicked && this.state.count === "" && this.state.restriction === "count"}
                />;
        }
    };

    render() {
        return (
            <Dialog open={this.props.open} onClose={this.props.onClose}>
                <DialogTitle>
                    <Grid container direction="row">
                        <EventNoteIcon/>
                        <Typography style={{marginLeft: "1vh"}}>
                            Add new schedule
                        </Typography>
                    </Grid>
                </DialogTitle>
                <DialogContent>
                    <Grid container item direction="column" spacing={2} style={this.formGridStyle}>
                        <Grid item xs={12}>
                            <TeacherSelect onSelect={this.selectTeacher}
                                           required/>
                        </Grid>
                        <Grid item xs={12}>
                            <RootGroupSelect onSelect={this.selectGroup}
                                             required/>
                        </Grid>
                        <Grid item xs={12}>
                            <SubjectSelect onSelect={this.selectSubject} required/>
                        </Grid>
                        <Grid item xs={12}>
                            <KeyboardDatePicker
                                style={{width: "80%"}}
                                disableToolbar
                                autoOk
                                variant="inline"
                                inputVariant="outlined"
                                format="DD/MM/YYYY"
                                label="Start date"
                                helperText="Date of the first event occur, then event occurs every week"
                                value={this.state.startDate}
                                onChange={(date) => this.setState({startDate: date})}
                                InputAdornmentProps={{position: "start"}}
                            />
                        </Grid>
                        <Grid item container direction="row" style={{width: "80%"}}>
                            <Grid item xs={6}>
                                <KeyboardTimePicker
                                    margin="normal"
                                    label="Start Time"
                                    format="HH:mm"
                                    ampm={false}
                                    value={this.state.startTime}
                                    onChange={(time) => this.setState({startTime: time})}
                                    style={{marginRight: "1vh"}}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <KeyboardTimePicker
                                    margin="normal"
                                    format="HH:mm"
                                    ampm={false}
                                    label="End Time"
                                    value={this.state.endTime}
                                    onChange={(time) => this.setState({endTime: time})}
                                />
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                margin="dense"
                                label="Interval"
                                helperText="Example: interval 10 means that event occurs each 10 week"
                                style={{width: "80%"}}
                                onChange={event => this.setState({interval: event.target.value})}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl component="fieldset" required>
                                <FormLabel component="legend">Restriction</FormLabel>
                                <RadioGroup row value={this.state.restriction}
                                            onChange={this.handleChangeRadioRestriction}>
                                    <FormControlLabel value="COUNT" control={<Radio color="primary"/>}
                                                      label="Count"
                                                      onClick={event => this.setState({restrictionType: event.target.value})}/>
                                    <FormControlLabel value="END_DATE" control={<Radio color="primary"/>}
                                                      label="End date"
                                                      onClick={event => this.setState({restrictionType: event.target.value})}/>
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            {this.switchForm()}
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => this.save()} color="primary">
                        Save
                    </Button>
                    <Button onClick={this.close} color="secondary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}
