import * as React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {ServiceProvider} from "../../service/ServiceProvider";
import Errors from "../../error/Errors";

export class GroupSelect extends React.Component{

    managementService;

    constructor(props, context) {
        super(props, context);
        this.state = {
            open: false,
            options: []
        };
        const provider = ServiceProvider.provider();
        this.managementService = provider.getService(provider.service.MANAGEMENT_SERVICE);
        this.getSubgroups();
    }

    getSubgroups = () => {
        this.managementService.getSubgroups()
            .then(response => response.data)
            .then(data => this.setState({options: data}))
            .catch(reason => this.props.showAlert(Errors.getErrorMessage(reason)));
    };

    getOptionLabel = (option) => {
        return option.name;
    };

    render() {
        return (
            <Autocomplete id="subgroup_select"
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
                              <TextField required={this.props.required} error={this.props.error}
                                         style={{width: "100%"}} {...params}
                                         label="Group" variant="outlined"/>}
            />
        );
    }
}
