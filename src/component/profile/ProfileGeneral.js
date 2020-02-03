import * as React from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import MailIcon from "@material-ui/icons/Mail";
import Fab from "@material-ui/core/Fab";
import EditIcon from "@material-ui/icons/Edit";

export class ProfileGeneral extends React.Component {

    render() {
        return (
            <Paper elevation={5} style={this.props.paperStyle}>
                <Grid container spacing={1} direction="row" justify="flex-start" alignItems="flex-start">
                    <Grid item>
                        <img alt="Empty" src={this.props.user.pictureUrl} style={this.props.avatarStyle}/>
                    </Grid>
                    <Grid item style={{margin: "2vh"}}>
                        <Grid item container direction="column">
                            <Typography variant="h4" gutterBottom color="textPrimary">
                                {this.props.user.firstName + " " + this.props.user.lastName}
                            </Typography>
                        </Grid>
                        <Grid item container direction="row">
                            <Avatar style={{marginRight: "5px"}}>
                                <MailIcon color="action"/>
                            </Avatar>
                            <Typography variant="h6" gutterBottom color="textSecondary">
                                {this.props.user.email}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item style={{margin: "2vh"}}>
                        <Fab color="gray" aria-label="edit">
                            <EditIcon/>
                        </Fab>
                    </Grid>
                </Grid>
            </Paper>
        );
    }
}

export default ProfileGeneral;
