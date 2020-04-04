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

export class SubjectDetailsItem extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            dialogOpen: false
        };
    }

    panelStyle = {
        backgroundImage: `url(${backgroundPaper})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover"
    };

    render() {
        return (
            <Grid item container direction="column">
                <ExpansionPanel style={this.panelStyle}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                        <EventIcon/>
                        <Typography style={{marginLeft: "1vh"}}>{this.props.data.group.name}</Typography>
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
                            <Grid item xs={0.3}>
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
                </ExpansionPanel>
                <StudentDialog open={this.state.dialogOpen}
                               onClose={() => this.setState({dialogOpen: false})}
                               data={this.props.data.group.students}/>
            </Grid>
        );
    }
}
