import * as React from "react";
import {Dialog, DialogTitle} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import GroupIcon from "@material-ui/icons/Group";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import TeacherSelect from "../select/TeacherSelect";
import Button from "@material-ui/core/Button";
import {ServiceProvider} from "../../service/ServiceProvider";
import DialogContent from "@material-ui/core/DialogContent";
import backgroundPaper from "../../../assets/sidebarBackground.jpeg";
import {RootGroupSelect} from "../select/RootGroupSelect";

export class CreateGroupDialog extends React.Component {

    managementService;

    constructor(props, context) {
        super(props, context);
        this.state = {
            selectedParentGroupId: "",
            groupName: "",
            submitClicked: false,
            selectedTutorId: ""
        };
        const provider = ServiceProvider.provider();
        this.managementService = provider.getService(provider.service.MANAGEMENT_SERVICE);
    }

    handleChange = event => {
        this.setState({selectedParentGroupId: event.target.value});
    };

    onChangeName = event => {
        this.setState({groupName: event.target.value});
    };

    createGroup = () => {
        this.setState({submitClicked: true});
        if (this.state.groupName === "") return;
        let request = {
            name: this.state.groupName,
            parentGroupId: this.state.selectedParentGroupId,
            teacherId: this.state.selectedTutorId
        };
        this.managementService.createGroup(request);
        this.setState({submitClicked: false});
        this.props.onSuccess("Group created successfully");
    };

    selectTutor = (value) => {
        this.setState({selectedTutorId: value ? value.id : ""});
    };

    selectGroup = (value) => {
        this.setState({selectedParentGroupId: value ? value.id : ""});
    };

    paperStyle = {
        backgroundImage: `url(${backgroundPaper})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover"
    };

    onDialogClose = () => {
        this.setState({
            selectedParentGroupId: "",
            groupName: "",
            submitClicked: false,
            selectedTutorId: ""
        });
        this.props.onClose();
    };

    render() {
        return (
            <Dialog open={this.props.open} onClose={this.onDialogClose}>
                <DialogTitle style={this.paperStyle}>
                    <Grid item container xs={12} direction="row">
                        <GroupIcon/>
                        <Typography style={{marginLeft: "2vh"}}>
                            Add new group
                        </Typography>
                    </Grid>
                </DialogTitle>
                <DialogContent style={this.paperStyle}>
                    <Grid item container spacing={2} style={this.formGridStyle}>
                        <Grid item xs={12}>
                            <TextField id="group-name" label="Group Name"
                                       onChange={this.onChangeName} required
                                       error={this.state.groupName === "" && this.state.submitClicked}
                                       helperText={this.state.groupName === ""
                                       && this.state.submitClicked ? "Required" : ""}
                                       variant="outlined" style={{width: "80%"}}/>
                        </Grid>
                        <Grid item xs={12}>
                            <RootGroupSelect showAlert={this.props.showAlert}
                                             onSelect={this.selectGroup}
                                             required={this.state.selectedTutorId === ""}
                                             error={this.state.selectedParentGroupId === "" &&
                                             this.state.submitClicked}
                                             disabled={this.state.selectedTutorId !== ""}/>
                        </Grid>
                        <Grid item xs={12}>
                            <TeacherSelect showAlert={this.props.showAlert}
                                           onSelect={this.selectTutor}
                                           required={this.state.selectedParentGroupId === ""}
                                           error={this.state.selectedTutorId === "" &&
                                           this.state.submitClicked &&
                                           this.state.selectedParentGroupId === ""}
                                           disabled={this.state.selectedParentGroupId !== ""}/>
                        </Grid>
                        <Grid item xs={12}>
                            <Button color="primary" onClick={this.createGroup}>Create</Button>
                            <Button color="secondary" onClick={this.props.onClose}>Cancel</Button>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        );
    }
}
