import * as React from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import DateRangeIcon from "@material-ui/icons/DateRange";
import SubjectIcon from "@material-ui/icons/Subject";
import {Paper} from "@material-ui/core";
import backgroundPaper from "../../assets/sidebarBackground.jpeg";
import Grid from "@material-ui/core/Grid";

export class ViewTabs extends React.Component {

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

    render() {
        return (
            <Grid item>
                <Paper style={this.paperStyle}>
                    <Tabs value={this.props.value}
                          onChange={(event, newValue) => this.props.onChange(newValue)}
                          indicatorColor="primary"
                          textColor="primary"
                          centered variant="fullWidth">
                        <Tab icon={<DateRangeIcon/>} label="Calendar" value="calendar"/>
                        <Tab icon={<SubjectIcon/>} label="List" value="list"/>
                    </Tabs>
                </Paper>
            </Grid>
        );
    };
}
