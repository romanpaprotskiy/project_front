import * as React from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import EventNoteIcon from '@material-ui/icons/EventNote';
import {TextField} from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import {KeyboardDatePicker, KeyboardTimePicker} from "@material-ui/pickers";
import {AttendeesList} from "./AttendeesList";
import {ServiceProvider} from "../../service/ServiceProvider";
import {SelectedAttendees} from "./SelectedAttendees";

export class EventDialog extends React.Component {

    eventService;

    constructor(props, context) {
        super(props, context);
        this.state = {
            summary: "",
            date: null,
            startTime: null,
            endTime: null,
            saveClicked: false,
            selected: []
        };
        const serviceProvider = ServiceProvider.provider();
        this.eventService = serviceProvider.getService(serviceProvider.service.EVENT_SERVICE);
    }

    formGridStyle = {
        margin: "1vh",
        width: "50vh"
    };

    close = () => {
        this.setState({
            summary: "",
            saveClicked: false,
            selected: []
        });
        this.props.onClose();
    };

    getUsers = async (search) => {
        if (!search) search = "";
        return await this.eventService.getUsers(search)
            .then(response => response.data);
    };

    onSelect = (item) => {
        let selected = this.state.selected;
        if (selected.indexOf(item) !== -1)
            selected.splice(selected.indexOf(item), 1);
        else selected.push(item);
        this.setState({selected: selected});
    };

    render() {
        return (
            <Dialog open={this.props.open} onClose={this.close}>
                <DialogTitle>
                    <Grid container direction="row">
                        <EventNoteIcon/>
                        <Typography style={{marginLeft: "1vh"}}>
                            Create event
                        </Typography>
                    </Grid>
                </DialogTitle>
                <DialogContent>
                    <Grid container direction="column" spacing={3} style={this.formGridStyle}>
                        <Grid item xs={12}>
                            <TextField margin="dense"
                                       id="summary"
                                       label="Summary"
                                       onChange={event => this.setState({summary: event.target.value})}
                                       fullWidth
                                       variant="filled"
                                       error={this.state.saveClicked && this.state.summary === ""}
                                       style={{width: "80%"}}/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField margin="dense"
                                       id="location"
                                       label="Location"
                                       onChange={event => this.setState({location: event.target.value})}
                                       fullWidth
                                       variant="filled"
                                       error={this.state.saveClicked && this.state.location === ""}
                                       style={{width: "80%"}}/>
                        </Grid>
                        <Grid item xs={12}>
                            <KeyboardDatePicker
                                style={{width: "80%"}}
                                disableToolbar
                                autoOk
                                variant="inline"
                                inputVariant="outlined"
                                format="DD/MM/YYYY"
                                label="Date"
                                value={this.state.date}
                                onChange={(date) => this.setState({date: date})}
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
                            <Typography style={{marginLeft: "1vh", marginBottom: "2vh"}}>Selected attendees</Typography>
                            <SelectedAttendees data={this.state.selected} onSelect={this.onSelect}/>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography style={{marginLeft: "1vh", marginBottom: "2vh"}}>Attendees</Typography>
                            <AttendeesList selected={this.state.selected} data={this.getUsers}
                                           onSelect={this.onSelect} onSearch={this.getUsers}/>
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
