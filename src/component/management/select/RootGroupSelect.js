import * as React from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import {ServiceProvider} from "../../service/ServiceProvider";
import Errors from "../../error/Errors";

export class RootGroupSelect extends React.Component{

    managementService;

    constructor(props, context) {
        super(props, context);
        this.state = {
            open: false,
            options: []
        };
        const provider = ServiceProvider.provider();
        this.managementService = provider.getService(provider.service.MANAGEMENT_SERVICE);
        this.getRootGroups();
    }

    getRootGroups = () => {
        this.managementService.getRootGroups()
            .then(result => result.data)
            .then(data => this.setState({options: data}))
            .catch(reason => this.props.showAlert(Errors.getErrorMessage(reason)));
    };

    getOptionLabel = (option) => {
        return option.name;
    };

    render() {
        return (
            <Autocomplete id="group_select"
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
                                         style={{width: "100%"}} {...params} label="Parent group" variant="outlined"/>}/>
        );
    }
}
