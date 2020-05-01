import * as React from "react";
import backgroundPaper from "../../assets/sidebarBackground.jpeg";
import Grid from "@material-ui/core/Grid";
import {Paper} from "@material-ui/core";
import {
    Appointments,
    AppointmentTooltip,
    MonthView,
    Scheduler,
    WeekView
} from "@devexpress/dx-react-scheduler-material-ui";

export class ScheduleCalendar extends React.Component{

    paperStyle = {
        marginLeft: "5vh",
        marginTop: "5vh",
        marginRight: "5vh",
        width: "85%",
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
        console.log(dateTime);
        return dateTime[0] + "-" + this.formatNumber(dateTime[1]) + "-"
            +  this.formatNumber(dateTime[2]) + "T"
            +  this.formatNumber(dateTime[3]) + ":"
            + this.formatNumber(dateTime[4]);
    };

    render() {
        return (
            <Grid item container>
                <Paper style={this.paperStyle}>
                    <Scheduler height={this.props.height} firstDayOfWeek={1} data={this.props.data?.map(el => {
                        return {
                            title: el.subjectName + " [" + el.groupName + "]" ,
                            startDate: this.formatDateTime(el.startDateTime),
                            endDate: this.formatDateTime(el.endDateTime)
                        };
                    })}>
                        <MonthView/>
                        <Appointments/>
                        <AppointmentTooltip/>
                    </Scheduler>
                </Paper>
            </Grid>
        );
    }
}
