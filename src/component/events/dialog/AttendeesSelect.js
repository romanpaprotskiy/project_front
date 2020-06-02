import * as React from "react";
import Grid from "@material-ui/core/Grid";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {RestrictionList} from "./RestrictionList";
import {ServiceProvider} from "../../service/ServiceProvider";

export class AttendeesSelect extends React.Component {

    eventService;

    constructor(props, context) {
        super(props, context);
        this.state = {
            addClicked: false,
            submitClicked: false,
            selected: "",
            restrictionTabValue: 0
        }
        const serviceProvider = ServiceProvider.provider();
        this.eventService = serviceProvider.getService(serviceProvider.service.EVENT_SERVICE);
    }

    select = (value) => {
        this.setState({selected: value ? value.id : ""});
        if (value) this.props.onSelected(value.id, this.state.type);
    };

    handleChangeRestriction = (event, newValue) => {
        this.setState({restrictionTabValue: newValue});
    };

    getTeachers = async () => {
        return await this.eventService.getTeachers()
            .then(response => response.data);
    };

    getStudents = async () => {
        return await this.eventService.getStudents()
            .then(response => response.data);
    };

    switchList = () => {
        const value = this.state.restrictionTabValue;
        console.log(value === 1);
        switch (value) {
            case 0:
                return <RestrictionList value={value} index={0} data={this.getTeachers}/>
            case 1:
                return <RestrictionList value={value} index={1} data={this.getStudents}/>
            default:
                return undefined;
        }
    };

    render() {
        return (
            <Grid item style={{width: "85%"}}>
                <Tabs
                    value={this.state.restrictionTabValue}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={this.handleChangeRestriction}
                    variant="scrollable">
                    <Tab label="Teacher" id={0}/>
                    <Tab label="Student" id={1}/>
                    <Tab label="Group" id={2}/>
                </Tabs>
                {this.switchList()}
            </Grid>
        );
    }
}
