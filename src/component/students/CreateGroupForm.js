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

export class CreateGroupForm extends React.Component {

    studentService;

    constructor(props, context) {
        super(props, context);
        this.state = {
            selectedParentGroupId: "",
            groupName: "",
            parentGroups: []
        };
        const provider = ServiceProvider.provider();
        this.studentService = provider.getService(provider.service.STUDENT_SERVICE);
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
        this.studentService.getRootGroups()
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
        let request = {
            name: this.state.groupName,
            parentGroupId: this.state.selectedParentGroupId
        };
        this.studentService.createGroup(request);
    };

    render() {
        return (
            <Fade in={this.props.checked}>
                <Paper style={this.paperStyle}>
                        <Grid item container spacing={2} style={this.formGridStyle}>
                            <Grid item xs={12} sm={6}>
                                <TextField id="group-name" label="Group Name"
                                           onChange={this.onChangeName} required/>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl style={{minWidth: "120px"}}>
                                    <InputLabel id="parent-group-select-label">Parent group</InputLabel>
                                    <Select labelId="parent-group-select-label"
                                            id="parent-group-select-id"
                                            value={this.state.selectedParentGroupId}
                                            onChange={this.handleChange}>
                                        <MenuItem value=""><em>None</em></MenuItem>
                                        {this.state.parentGroups.map(group => {
                                            return <MenuItem key={group.id} value={group.id}>{group.name}</MenuItem>
                                        })}
                                    </Select>
                                </FormControl>
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
