import * as React from "react";
import {ExpansionPanel, ExpansionPanelDetails, Icon, Tooltip} from "@material-ui/core";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Grid from "@material-ui/core/Grid";
import PeopleIcon from "@material-ui/icons/People";
import Typography from "@material-ui/core/Typography";
import backgroundPaper from "../../assets/sidebarBackground.jpeg";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import Avatar from "@material-ui/core/Avatar";
import AccessTimeIcon from '@material-ui/icons/AccessTime';

export class TeachersList extends React.Component {

    paperStyle = {
        backgroundImage: `url(${backgroundPaper})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover"
    };

    render() {
        return (
            <Grid item style={{marginTop: "3vh"}}>
                <ExpansionPanel style={this.paperStyle}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                        <Grid container direction="row">
                            <Icon>
                                <PeopleIcon/>
                            </Icon>
                            <Typography style={{marginLeft: "2vh"}}>
                                Teachers
                            </Typography>
                        </Grid>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <AvatarGroup>
                            {this.props.data.map(item => {
                                return <Tooltip title={item.firstName + " " + item.lastName}>
                                    <Avatar alt={item.firstName + " " + item.lastName} src={item.pictureUrl}/>
                                </Tooltip>
                            })}
                        </AvatarGroup>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </Grid>
        );
    }

}
