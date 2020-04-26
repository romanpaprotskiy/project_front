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

    data = [{
        title: "Introduction to CS",
        startDate: "2020-04-21T13:00",
        endDate: "2020-04-21T14:00",
    }];

    formatNumber = (number) => {
        return number < 10 ?  "0" + number : number;
    };

    formatDateTime = (dateTime) => {
        return dateTime[0] + "-" + this.formatNumber(dateTime[1]) + "-"
            +  this.formatNumber(dateTime[2]) + "T"
            +  this.formatNumber(dateTime[3]) + ":"
            + this.formatNumber(dateTime[4]);
    };

    render() {
        return (
            <Grid item container>
                <Paper style={this.paperStyle}>
                    <Scheduler height={this.props.height} firstDayOfWeek={1} data={this.props.data.map(el => {
                        return {
                            title: el.title,
                            startDate: this.formatDateTime(el.startDate),
                            endDate: this.formatDateTime(el.endDate)
                        };
                    })}>
                        <WeekView startDayHour={8} endDayHour={22}/>
                        <Appointments/>
                        <AppointmentTooltip/>
                    </Scheduler>
                </Paper>
            </Grid>
        );
    }
}
