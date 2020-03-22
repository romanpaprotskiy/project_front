import * as React from "react";
import Autocomplete from '@material-ui/lab/Autocomplete';
import {ServiceProvider} from "../service/ServiceProvider";
import Errors from "../error/Errors";
import TextField from "@material-ui/core/TextField";

export class TeacherSelect extends React.Component {

    studentService;

    constructor(props, context) {
        super(props, context);
        this.state = {
            open: false,
            options: []
        };
        const provider = ServiceProvider.provider();
        this.studentService = provider.getService(provider.service.STUDENT_SERVICE);
        this.getTeachers();
    }

    getTeachers = () => {
        this.studentService.getTeachers()
            .then(response => response.data)
            .then(data => this.setState({options: data}))
            .catch(reason => this.props.showAlert(Errors.getErrorMessage(reason)));
    };

    getOptionLabel = (option) => {
         return  option.firstName + " "
            + option.lastName + "\n " + option.scienceTitleName;
    };

    render() {
        return (
            <Autocomplete id="tutor_select"
                          open={this.state.open}
                          onOpen={() => this.setState({open: true})}
                          onClose={() => this.setState({open: false})}
                          onChange={(event, value) => this.props.onSelect(value)}
                          options={this.state.options}
                          getOptionLabel={option => this.getOptionLabel(option)}
                          style={{width: "80%"}}
                          autoHighlight
                          disabled={this.props.disabled}
                          renderInput={params =>
                              <TextField style={{width: "100%"}} {...params} label="Tutor" variant="outlined"/>}/>
        );
    }
}

export default TeacherSelect;
