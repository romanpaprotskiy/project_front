import * as React from "react";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Grid from "@material-ui/core/Grid";
import DehazeIcon from "@material-ui/icons/Dehaze";
import Typography from "@material-ui/core/Typography";
import {ExpansionPanel, ExpansionPanelDetails, TableBody, TableCell, TableContainer, TableRow} from "@material-ui/core";
import Table from "@material-ui/core/Table";
import backgroundPaper from "../../assets/sidebarBackground.jpeg";

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
                    <TableContainer style={{maxHeight: "20vh"}}>
                        <Table>
                            <TableBody>
                                {this.props.subjects.map(row => (
                                    <TableRow key={row.id}>
                                        <TableCell component="th" scope="row">
                                            {row.name}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        );
    }
}

export default SubjectsList;
