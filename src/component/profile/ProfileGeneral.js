import * as React from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import MailIcon from "@material-ui/icons/Mail";
import Fab from "@material-ui/core/Fab";
import EditIcon from "@material-ui/icons/Edit";
import backgroundPaper from "../../assets/sidebarBackground.jpeg";
import EditDialog from "./EditDialog";

export class ProfileGeneral extends React.Component {

    constructor(props) {
        super(props);
        this.state = {openEdit: false};
    }

    paperStyle = {
        marginLeft: "5vh",
        marginTop: "5vh",
        width: "100%",
        backgroundImage: `url(${backgroundPaper})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover"
    };

    openEditDialog = () => {
        this.setState({openEdit: true});
    };

    handleCloseEditDialog = () => {
        this.setState({openEdit: false});
    };

    render() {
        return (
            <Paper elevation={5} style={this.paperStyle}>
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
                        <Fab aria-label="edit" onClick={this.openEditDialog}>
                            <EditIcon/>
                        </Fab>
                        <EditDialog open={this.state.openEdit}
                                    handleClose={this.handleCloseEditDialog}
                                    update={this.props.updateProfileDetails}
                                    alert={this.props.alert}
                                    user={this.props.user}/>
                    </Grid>
                </Grid>
            </Paper>
        );
    }
}

export default ProfileGeneral;
