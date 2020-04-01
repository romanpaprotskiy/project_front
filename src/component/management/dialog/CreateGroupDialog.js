import * as React from "react";
import {Dialog, DialogActions, DialogTitle} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import GroupIcon from "@material-ui/icons/Group";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import TeacherSelect from "../select/TeacherSelect";
import Button from "@material-ui/core/Button";
import {ServiceProvider} from "../../service/ServiceProvider";
import DialogContent from "@material-ui/core/DialogContent";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import {RootGroupSelect} from "../select/RootGroupSelect";

export class CreateGroupDialog extends React.Component {

    managementService;

    constructor(props, context) {
        super(props, context);
        this.state = {
            selectedParentGroupId: "",
            groupName: "",
            submitClicked: false,
            selectedTutorId: "",
            type: "group"
        };
        const provider = ServiceProvider.provider();
        this.managementService = provider.getService(provider.service.MANAGEMENT_SERVICE);
    }

    onChangeName = event => {
        this.setState({groupName: event.target.value});
    };

    create = () => {
        switch (this.state.type) {
            case "group":
                this.createGroup();
                break;
            case "subGroup":
                this.createSubGroup();
                break;
        }
    };

    createGroup = () => {
        this.setState({submitClicked: true});
        if (this.state.groupName === "" || this.state.selectedTutorId === "") return;
        let request = {
            name: this.state.groupName,
            teacherId: this.state.selectedTutorId
        };
        this.managementService.createGroup(request);
        this.setState({
            groupName: "",
            submitClicked: false,
            selectedTutorId: ""
        });
        this.props.onSuccess("Group created successfully");
    };

    createSubGroup = () => {
        this.setState({submitClicked: true});
        if (this.state.groupName === "" || this.state.selectedParentGroupId === "") return;
        let request = {
            name: this.state.groupName,
            groupId: this.state.selectedParentGroupId,
        };
        this.managementService.createSubGroup(request);
        this.setState({
            groupName: "",
            submitClicked: false,
            selectedTutorId: "",
            selectedParentGroupId: ""
        });
        this.props.onSuccess("Sub Group created successfully");
    };

    selectTutor = (value) => {
        this.setState({selectedTutorId: value ? value.id : ""});
    };

    selectGroup = (value) => {
        this.setState({selectedParentGroupId: value ? value.id : ""});
    };

    onDialogClose = () => {
        this.setState({
            selectedParentGroupId: "",
            groupName: "",
            submitClicked: false,
            selectedTutorId: "",
            type: "group"
        });
        this.props.onClose();
    };

    handleChangeRadio = (event) => {
        this.setState({type: event.target.value});
    };

    switchSelect = () => {
        switch (this.state.type) {
            case "group":
                return <TeacherSelect showAlert={this.props.showAlert}
                                      onSelect={this.selectTutor}
                                      required={this.state.selectedParentGroupId === ""}
                                      error={this.state.selectedTutorId === "" &&
                                      this.state.submitClicked &&
                                      this.state.selectedParentGroupId === ""}
                                      disabled={false}/>;
            case "subGroup":
                return <RootGroupSelect showAlert={this.props.showAlert}
                                        onSelect={this.selectGroup}
                                        required={this.state.type === "subGroup"}
                                        error={this.state.selectedParentGroupId === "" &&
                                        this.state.submitClicked && this.state.type === "subGroup"}
                                        disabled={false}/>;
            default:
                return undefined;
        }
    };

    render() {
        return (
            <Dialog open={this.props.open} onClose={this.onDialogClose}>
                <DialogTitle>
                    <Grid item container xs={12} direction="row">
                        <GroupIcon/>
                        <Typography style={{marginLeft: "2vh"}}>
                            Add new group
                        </Typography>
                    </Grid>
                </DialogTitle>
                <DialogContent>
                    <Grid item container spacing={2} style={this.formGridStyle}>
                        <Grid item xs={12}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Type</FormLabel>
                                <RadioGroup row value={this.state.type} onChange={this.handleChangeRadio}>
                                    <FormControlLabel value="group" control={<Radio color="primary"/>} label="Group"/>
                                    <FormControlLabel value="subGroup" control={<Radio color="primary"/>}
                                                      label="Sub Group"/>
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField id="group-name" label="Group Name"
                                       onChange={this.onChangeName} required
                                       error={this.state.groupName === "" && this.state.submitClicked}
                                       helperText={this.state.groupName === ""
                                       && this.state.submitClicked ? "Required" : ""}
                                       variant="outlined" style={{width: "80%"}}/>
                        </Grid>
                        <Grid item xs={12}>
                            {this.switchSelect()}
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Grid item xs={12}>
                        <Button color="primary" onClick={this.create}>Create</Button>
                        <Button color="secondary" onClick={this.props.onClose}>Cancel</Button>
                    </Grid>
                </DialogActions>
            </Dialog>
        );
    }
}
