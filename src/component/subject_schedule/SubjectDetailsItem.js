import * as React from "react";
import Grid from "@material-ui/core/Grid";
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import {ExpansionPanel, Tooltip} from "@material-ui/core";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import backgroundPaper from "../../assets/sidebarBackground.jpeg";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import EventIcon from '@material-ui/icons/Event';
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import {StudentDialog} from "./dialog/StudentDialog";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from '@material-ui/icons/Delete';
import {ServiceProvider} from "../service/ServiceProvider";
import Errors from "../error/Errors";

export class SubjectDetailsItem extends React.Component {

    subjectService;

    constructor(props, context) {
        super(props, context);
        this.state = {
            dialogOpen: false
        };
        const provider = ServiceProvider.provider();
        this.subjectService = provider.getService(provider.service.SUBJECT_SERVICE);
    }

    panelStyle = {
        backgroundImage: `url(${backgroundPaper})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover"
    };

    getTime(time) {
        const hour = time[0] > 10 ? time[0] : "0" + time[0];
        const minute = time[1] > 10 ? time[1] : "0" + time[1];
        return hour + ":" + minute;
    }

    delete = () => {
        this.subjectService.deleteSchedule(this.props.data.scheduleId)
            .then(() => this.props.onDelete(this.props.data.subjectId))
            .catch(reason => this.props.showAlert(Errors.getErrorMessage(reason)));
    }

    render() {
        return (
            <Grid item container direction="column">
                <ExpansionPanel style={this.panelStyle}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                        <EventIcon/>
                        <Typography style={{marginLeft: "1vh"}}>{this.props.data.group.name}</Typography>
                        <Typography style={{marginLeft: "1vh"}}>
                            {new Date(this.props.data.schedule.startDate).toLocaleString('en-us', {  weekday: 'long' })}
                        </Typography>
                        <Typography style={{marginLeft: "1vh"}}>
                            {this.getTime(this.props.data.schedule.startTime)}
                        </Typography>
                        <Typography style={{marginLeft: "1vh"}}>
                            -
                        </Typography>
                        <Typography style={{marginLeft: "1vh"}}>
                            {this.getTime(this.props.data.schedule.endTime)}
                        </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Grid id="group" container direction="row">
                            <Grid item container xs={6} direction="column">
                                <Grid item>
                                    <Typography>Students</Typography>
                                </Grid>
                                <Grid item style={{marginLeft: "1vh", marginTop: "2vh"}}>
                                    <AvatarGroup max={8}
                                                 onClick={() => this.setState({dialogOpen: true})}
                                                 style={{cursor: "pointer"}}>
                                        {this.props.data.group.students.map((item, index) => {
                                            return <Tooltip key={index}
                                                            title={item.user.firstName + " " + item.user.lastName}>
                                                <Avatar src={item.user.pictureUrl}
                                                        alt={item.user.firstName + " " + item.user.lastName}
                                                        style={{width: "4.5vh", height: "4.5vh"}}/>
                                            </Tooltip>
                                        })}
                                    </AvatarGroup>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Divider orientation="vertical"/>
                            </Grid>
                            <Grid item container direction="column" xs={5}>
                                <Grid item style={{marginLeft: "1vh"}}>
                                    <Typography>Teacher</Typography>
                                </Grid>
                                <Grid item>
                                    <List>
                                        <ListItem>
                                            <ListItemAvatar>
                                                <Avatar src={this.props.data.teacher.pictureUrl}
                                                        alt={this.props.data.teacher.firstName + " " + this.props.data.teacher.lastName}/>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={this.props.data.teacher.firstName + " " + this.props.data.teacher.lastName}
                                                secondary={this.props.data.teacher.email}/>
                                        </ListItem>
                                    </List>
                                </Grid>
                            </Grid>
                        </Grid>
                    </ExpansionPanelDetails>
                    <ExpansionPanelActions>
                        <Button>
                            <EditIcon/>
                            <Typography variant="overline">Edit</Typography>
                        </Button>
                        <Button onClick={this.delete}>
                            <DeleteIcon/>
                            <Typography variant="overline">Delete</Typography>
                        </Button>
                    </ExpansionPanelActions>
                </ExpansionPanel>
                <StudentDialog open={this.state.dialogOpen}
                               onClose={() => this.setState({dialogOpen: false})}
                               data={this.props.data.group.students}/>
            </Grid>
        );
    }
}
