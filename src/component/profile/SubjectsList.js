import * as React from "react";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Grid from "@material-ui/core/Grid";
import DehazeIcon from "@material-ui/icons/Dehaze";
import Typography from "@material-ui/core/Typography";
import {ExpansionPanel, ExpansionPanelDetails, TableBody, TableCell, TableContainer, TableRow} from "@material-ui/core";
import Table from "@material-ui/core/Table";
import backgroundPaper from "../../assets/sidebarBackground.jpeg";
import EventIcon from '@material-ui/icons/Event';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

export class SubjectsList extends React.Component {

    paperStyle = {
        marginLeft: "5vh",
        marginTop: "5vh",
        backgroundImage: `url(${backgroundPaper})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover"
    };

    render() {
        return (
            <ExpansionPanel style={this.paperStyle}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}
                                       aria-controls="panel1c-content"
                                       id="panel1c-header">
                    <Grid style={{flexBasis: "33.33%"}} direction="row" item container>
                        <DehazeIcon style={{marginRight: "1vh"}}/>
                        <Typography>Subjects</Typography>
                    </Grid>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                        <List style={{maxHeight: "20vh"}}>
                            {this.props.subjects.map(row => {
                                return <ListItem key={row.id}>
                                    <ListItemIcon>
                                        <EventIcon/>
                                    </ListItemIcon>
                                    <ListItemText>
                                        {row.name}
                                    </ListItemText>
                                </ListItem>
                            })}
                        </List>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        );
    }
}

export default SubjectsList;
