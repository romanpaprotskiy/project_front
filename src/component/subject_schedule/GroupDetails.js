import * as React from "react";
import Grid from "@material-ui/core/Grid";
import {ExpansionPanel, ExpansionPanelDetails, Icon} from "@material-ui/core";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from "@material-ui/core/Typography";
import PeopleIcon from '@material-ui/icons/People';
import backgroundPaper from "../../assets/sidebarBackground.jpeg";

export class GroupDetails extends React.Component {

    constructor(props, context) {
        super(props, context);
    }

    paperStyle = {
        backgroundImage: `url(${backgroundPaper})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover"
    };

    render() {
        return (
            <Grid item>
                <ExpansionPanel style={this.paperStyle}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                        <Grid container direction="row">
                            <Icon>
                                <PeopleIcon/>
                            </Icon>
                            <Typography style={{marginLeft: "2vh"}}>
                                Groups
                            </Typography>
                        </Grid>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>

                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </Grid>
        );
    }
}
