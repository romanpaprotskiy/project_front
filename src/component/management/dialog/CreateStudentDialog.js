import * as React from "react";
import {Dialog, DialogActions, DialogContent, DialogTitle} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import Typography from "@material-ui/core/Typography";
import {UserSelect} from "../select/UserSelect";
import {ServiceProvider} from "../../service/ServiceProvider";
import Button from "@material-ui/core/Button";
import {GroupSelect} from "../select/GroupSelect";
import {KeyboardDatePicker} from "@material-ui/pickers";
import {RootGroupSelect} from "../select/RootGroupSelect";
import Errors from "../../error/Errors";

export class CreateStudentDialog extends React.Component {

    managementService;

    constructor(props, context) {
        super(props, context);
        this.state = {
            selectedUserId: "",
            submitClicked: false,
            selectedGroupId: "",
            selectedSubGroupId: "",
            selectedDate: null,
            subGroups: []
        };
        const provider = ServiceProvider.provider();
        this.managementService = provider.getService(provider.service.MANAGEMENT_SERVICE);
    }

    selectUser = (value) => {
        this.setState({selectedUserId: value ? value.id : ""});
    };

    selectGroup = (value) => {
        this.setState({selectedGroupId: value ? value.id : ""});
        if (value) this.getSubgroups(value.id);
    };

    selectSubGroup = (value) => {
        this.setState({selectedSubGroupId: value ? value.id : ""});
    };

    onClose = () => {
        this.setState({
            selectedUserId: "",
            submitClicked: false,
            selectedGroupId: "",
            selectedDate: null
        });
        this.props.onClose();
    };

    getSubgroups = (id) => {
        this.managementService.getSubgroups(id)
            .then(response => response.data)
            .then(data => this.setState({subGroups: data}))
            .catch(reason => this.props.showAlert(Errors.getErrorMessage(reason)));
    };

    createStudent = () => {
        this.setState({submitClicked: true});
        if (this.state.userId === "" || this.state.selectedGroupId === "") return;
        const request = {
            userId: this.state.selectedUserId,
            groupId: this.state.selectedGroupId,
            dateOfEnroll: this.state.selectedDate
        };
        this.managementService.createStudent(request);
        this.setState({
            selectedUserId: "",
            submitClicked: false,
            selectedGroupId: "",
            selectedDate: null
        });
        this.props.onSuccess("Student created successfully");
    };

    handleChangeDate = (date) => {
        this.setState({selectedDate: date});
    };

    formGridStyle = {
        margin: "1vh",
        width: "40vh"
    };

    render() {
        return (
            <Dialog open={this.props.open} onClose={this.onClose}>
                <DialogTitle>
                    <Grid item container xs={12} direction="row">
                        <PersonAddIcon/>
                        <Typography style={{marginLeft: "2vh"}}>
                            Add new student
                        </Typography>
                    </Grid>
                </DialogTitle>
                <DialogContent>
                    <Grid item container spacing={3} style={this.formGridStyle}>
                        <Grid item xs={12}>
                            <UserSelect showAlert={this.props.showAlert}
                                        onSelect={this.selectUser}
                                        required={true}
                                        error={this.state.selectedUserId === "" && this.state.submitClicked}/>
                        </Grid>
                        <Grid item xs={12}>
                            <RootGroupSelect showAlert={this.props.showAlert}
                                             onSelect={this.selectGroup}
                                             required={true}
                                             error={this.state.selectedGroupId === "" && this.state.submitClicked}/>
                        </Grid>
                        <Grid item xs={12}>
                            <GroupSelect data={this.state.subGroups}
                                         showAlert={this.props.showAlert}
                                         onSelect={this.selectSubGroup}
                                         required={true}
                                         error={this.state.selectedSubGroupId === "" && this.state.submitClicked}
                                         disabled={this.state.selectedGroupId === ""}/>
                        </Grid>
                        <Grid item xs={12}>
                            <KeyboardDatePicker
                                style={{width: "80%"}}
                                disableToolbar
                                autoOk
                                variant="inline"
                                inputVariant="outlined"
                                format="DD/MM/YYYY"
                                label="Date of starts"
                                value={this.state.selectedDate}
                                onChange={this.handleChangeDate}
                                InputAdornmentProps={{position: "start"}}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Grid item xs={12}>
                        <Button color="primary" onClick={this.createStudent}>Create</Button>
                        <Button color="secondary" onClick={this.onClose}>Cancel</Button>
                    </Grid>
                </DialogActions>
            </Dialog>
        );
    }
}
