import * as React from "react";
import {Paper} from "@material-ui/core";
import backgroundPaper from "../../assets/sidebarBackground.jpeg";
import {Appointments, AppointmentTooltip, Scheduler, WeekView} from "@devexpress/dx-react-scheduler-material-ui";

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

    data = {
        startDate: new Date("2020-02-06T11:20:00"),
        endDate: new Date("2020-02-06T12:40:00"),
        title:"Test"
    };

    render() {
        return (
            <Paper style={this.paperStyle}>
                <Scheduler height={this.props.height} data={[this.data]} firstDayOfWeek={1}>
                    <WeekView startDayHour={8} endDayHour={22}/>
                    <Appointments/>
                    <AppointmentTooltip />
                </Scheduler>
            </Paper>
        );
    }
}
