import * as React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

export class GroupSelect extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            open: false,
            options: []
        };
    }

    componentDidMount() {
        if (this.props.id) this.getSubgroups(this.props.id);
    }

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
                          options={this.props.data}
                          getOptionLabel={option => this.getOptionLabel(option)}
                          style={{width: "80%"}}
                          autoHighlight
                          disabled={this.props.disabled}
                          renderInput={params =>
                              <TextField required={this.props.required} error={this.props.error}
                                         style={{width: "100%"}} {...params}
                                         label="Sub Group" variant="outlined"/>}
            />
        );
    }
}
