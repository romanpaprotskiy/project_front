import * as React from "react";
import {Paper} from "@material-ui/core";
import backgroundPaper from "../../assets/sidebarBackground.jpeg";
import {Appointments, AppointmentTooltip, Scheduler, WeekView} from "@devexpress/dx-react-scheduler-material-ui";
import Grid from "@material-ui/core/Grid";

export class ProfileScheduler extends React.Component {

    paperStyle = {
        marginLeft: "5vh",
        marginTop: "5vh",
        width: "100%",
        backgroundImage: `url(${backgroundPaper})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover"
    };

    render() {
        return (
            <Grid item container>
                <Paper style={this.paperStyle}>
                    <Scheduler height={this.props.height} firstDayOfWeek={1}>
                        <WeekView startDayHour={8} endDayHour={22}/>
                        <Appointments/>
                        <AppointmentTooltip/>
                    </Scheduler>
                </Paper>
            </Grid>
        );
    }
}
