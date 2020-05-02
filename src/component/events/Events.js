import * as React from "react";
import Grid from "@material-ui/core/Grid";
import {ScheduleCalendar} from "../subject_schedule/ScheduleCalendar";

export class Events extends React.Component{

    constructor(props, context) {
        super(props, context);
        this.state = {

        };
    }

    render() {
        return (
            <Grid item container style={this.props.mainStyle}>
                <Grid item>
                    <ScheduleCalendar height={600}/>
                </Grid>
            </Grid>
        );
    }
}
