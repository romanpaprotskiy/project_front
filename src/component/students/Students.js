import * as React from "react";
import Grid from "@material-ui/core/Grid";
import Alert from "../snackbar/Alert";
import StudentsTable from "./StudentsTable";
import {CreateNewItemForm} from "./CreateNewItemForm";
import Success from "../snackbar/Success";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import {InputAdornment, TextField} from "@material-ui/core";
import backgroundPaper from "../../assets/sidebarBackground.jpeg";

export class Students extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            alertOpen: false,
            successOpen: false,
            successMessage: ''
        };
    }

    showAlert = (message) => {
        this.setState({
            alertOpen: true
        });
        if (message != null) this.setState({alertMessage: message});
    };

    hideSuccess = () => {
        this.setState({
            successOpen: false
        });
    };

    showSuccess = (message) => {
        this.setState({
            successOpen: true
        });
        if (message != null) this.setState({successMessage: message});
    };

    hideAlert = () => {
        this.setState({
            alertOpen: false
        });
    };

    studentTableStyle = {
        width: "50%"
    };

    groupTableStyle = {
        width: "35%"
    };

    paperStyle = {
        marginLeft: "5vh",
        marginTop: "5vh",
        backgroundImage: `url(${backgroundPaper})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        borderRadius: "5px"
    };

    render() {
        return (
            <Grid container direction="row" style={this.props.mainStyle}>
                <Grid item container direction="column" justify="flex-start" alignItems="flex-start"
                      style={this.studentTableStyle}>
                    <Grid item container direction="row">
                        <TextField variant="outlined" style={this.paperStyle}
                                   InputProps={{
                                       startAdornment:
                                           <InputAdornment position="start">
                                               <SearchIcon/>
                                           </InputAdornment>
                                   }}/>
                        <ButtonGroup color="action" variant="contained"
                                     style={{marginLeft: "5vh", marginTop: "5vh"}}>
                            <Button>Students</Button>
                            <Button>Groups</Button>
                            <Button>Teachers</Button>
                        </ButtonGroup>
                    </Grid>
                    <StudentsTable showAlert={this.showAlert}/>
                </Grid>
                <Grid item container direction="column" justify="flex-start" alignItems="flex-start"
                      style={this.groupTableStyle}>
                    <Grid item container direction="row">
                        <CreateNewItemForm showAlert={this.showAlert}
                                           showSuccess={this.showSuccess}/>
                    </Grid>
                    {/*<Grid item>*/}
                    {/*    <GroupTable showAlert={this.showAlert}/>*/}
                    {/*</Grid>*/}
                </Grid>
                <Alert isOpen={this.state.alertOpen}
                       alertMessage={this.state.alertMessage}
                       handleClose={this.hideAlert}/>
                <Success isOpen={this.state.successOpen}
                         successMessage={this.state.successMessage}
                         handleClose={this.hideSuccess}/>
            </Grid>
        );
    }
}

export default Students;
