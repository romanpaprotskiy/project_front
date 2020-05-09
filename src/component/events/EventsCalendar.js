import * as React from "react";
import backgroundPaper from "../../assets/sidebarBackground.jpeg";
import Grid from "@material-ui/core/Grid";
import {Paper} from "@material-ui/core";
import {Appointments, AppointmentTooltip, MonthView, Scheduler} from "@devexpress/dx-react-scheduler-material-ui";
import Fade from "@material-ui/core/Fade";

export class EventsCalendar extends React.Component {

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
            <Fade in={this.props.checked}>
                <Grid item>
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
            </Fade>
        );
    }
}
