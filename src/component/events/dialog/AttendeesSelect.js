import * as React from "react";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import {RootGroupSelect} from "../../management/select/RootGroupSelect";
import {SubjectSelect} from "../../subject_schedule/select/SubjectSelect";
import TeacherSelect from "../../management/select/TeacherSelect";

export class AttendeesSelect extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            type: this.props.type ? this.props.type : "",
            addClicked: false,
            submitClicked: false,
            selected: ""
        }
    }

    select = (value) => {
        this.setState({selected: value ? value.id : ""});
        if (value) this.props.onSelected(value.id, this.state.type);
    };

    handleChangeRadio = (event) => {
        this.setState({type: event.target.value});
    };

    switchSelect = () => {
        switch (this.state.type) {
            case "group":
                return <RootGroupSelect showAlert={this.props.showAlert}
                                        onSelect={this.select}
                                        required={true}
                                        error={this.state.selectedGroupId === "" && this.state.submitClicked}/>
            case "subject" :
                return <SubjectSelect onSelect={this.select} required/>;
            case "teacher":
                return <TeacherSelect showAlert={this.props.showAlert}
                                      onSelect={this.select}
                                      error={this.state.selected === "" &&
                                      this.state.submitClicked}
                                      disabled={false}/>;
            default:
                return undefined;
        }
    };

    render() {
        return (
            <Grid item>
                {!this.state.addClicked ? <FormControl component="fieldset">
                    <FormLabel control="legend">Attendees</FormLabel>
                    <Button onClick={() => this.setState({addClicked: true})}
                            color="primary" startIcon={<AddIcon/>}>Add</Button>
                </FormControl> : null}
                {this.state.addClicked ? <FormControl component="fieldset">
                    <FormLabel component="legend">Attendees</FormLabel>
                    <RadioGroup row value={this.state.type} onChange={this.handleChangeRadio}>
                        <FormControlLabel value="group" control={<Radio color="primary"/>} label="Group"/>
                        <FormControlLabel value="student" control={<Radio color="primary"/>}
                                          label="Student"/>
                        <FormControlLabel value="subject" control={<Radio color="primary"/>}
                                          label="Subject"/>
                        <FormControlLabel value="teacher" control={<Radio color="primary"/>}
                                          label="Teacher"/>
                    </RadioGroup>
                </FormControl> : null}
                {this.switchSelect()}
            </Grid>
        );
    }
}
