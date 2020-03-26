import * as React from "react";
import TextField from "@material-ui/core/TextField";
import {Fade, Paper} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import backgroundPaper from "../../assets/sidebarBackground.jpeg";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import {ServiceProvider} from "../service/ServiceProvider";
import Errors from "../error/Errors";
import TeacherSelect from "./TeacherSelect";
import GroupIcon from '@material-ui/icons/Group';
import Typography from "@material-ui/core/Typography";

export class CreateGroupForm extends React.Component {

    managementService;

    constructor(props, context) {
        super(props, context);
        this.state = {
            selectedParentGroupId: "",
            groupName: "",
            parentGroups: [],
            submitClicked: false,
            selectedTutorId: ""
        };
        const provider = ServiceProvider.provider();
        this.managementService = provider.getService(provider.service.MANAGEMENT_SERVICE);
        this.getRootGroups();
    }

    paperStyle = {
        marginLeft: "5vh",
        marginTop: "5vh",
        width: "100%",
        height: "100%",
        backgroundImage: `url(${backgroundPaper})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover"
    };

    formGridStyle = {
        margin: "1vh",
        padding: "1vh"
    };

    getRootGroups = () => {
        this.managementService.getRootGroups()
            .then(result => result.data)
            .then(data => this.setState({parentGroups: data}))
            .catch(reason => this.props.showAlert(Errors.getErrorMessage(reason)));
    };

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
        this.props.update();
        this.props.showSuccess("Group created successfully");
    };

    selectTutor = (value) => {
        this.setState({selectedTutorId: value?.id});
    };

    render() {
        return (
            <Fade in={this.props.checked}>
                <Paper style={this.paperStyle}>
                    <Grid item container spacing={2} style={this.formGridStyle}>
                        <Grid item container xs={12} direction="row">
                            <GroupIcon/>
                            <Typography style={{marginLeft: "2vh"}}>
                                Add new group
                            </Typography>
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
                            <FormControl style={{minWidth: "120px", width: "80%"}}>
                                <InputLabel id="parent-group-select-label"
                                            variant="filled">Parent group</InputLabel>
                                <Select labelId="parent-group-select-label"
                                        id="parent-group-select-id"
                                        value={this.state.selectedParentGroupId}
                                        onChange={this.handleChange}
                                        variant="outlined">
                                    <MenuItem value=""><em>None</em></MenuItem>
                                    {this.state.parentGroups.map(group => {
                                        return <MenuItem key={group.id} value={group.id}>{group.name}</MenuItem>
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <TeacherSelect showAlert={this.props.showAlert}
                                           onSelect={this.selectTutor}
                                           required
                                           error={this.state.selectedTutorId === "" &&
                                           this.state.submitClicked &&
                                           this.state.selectedParentGroupId === ""}
                                           disabled={this.state.selectedParentGroupId !== ""}/>
                        </Grid>
                        <Grid item xs={12}>
                            <Button color="primary" onClick={this.createGroup}>Create</Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Fade>
        );
    }
}
