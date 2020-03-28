import * as React from "react";
import Grid from "@material-ui/core/Grid";
import Alert from "../snackbar/Alert";
import StudentsTable from "./StudentsTable";
import Success from "../snackbar/Success";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import {InputAdornment, TextField} from "@material-ui/core";
import backgroundPaper from "../../assets/sidebarBackground.jpeg";
import GroupTable from "./GroupTable";
import TeachersTable from "./TeachersTable";
import {CreateNewItemDial} from "./CreateNewItemDial";
import {CreateGroupDialog} from "./dialog/CreateGroupDialog";

export class Students extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            alertOpen: false,
            successOpen: false,
            successMessage: '',
            table: "students",
            dialogOpen: false,
            dialogType: ""
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
        width: "60%"
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

    switchTable = () => {
        switch (this.state.table) {
            case "students":
                return <StudentsTable checked={this.state.table === "students"} showAlert={this.showAlert}/>;
            case "groups":
                return <GroupTable checked={this.state.table === "groups"} showAlert={this.showAlert}/>;
            case "teachers":
                return <TeachersTable checked={this.state.table === "teachers"} showAlert={this.showAlert}/>;
            default:
                return undefined;
        }
    };

    handleChangeDial = (type) => {
        this.setState({dialogType: type, dialogOpen: true});
    };

    render() {
        return (
            <Grid container direction="row" style={this.props.mainStyle}>
                <Grid item container direction="column" justify="flex-start" alignItems="flex-start"
                      style={this.studentTableStyle}>
                    <Grid item container direction="row">
                        <Grid item container direction="row">
                            <TextField variant="outlined" style={this.paperStyle}
                                       InputProps={{
                                           startAdornment:
                                               <InputAdornment position="start">
                                                   <SearchIcon/>
                                               </InputAdornment>
                                       }}/>
                            <ButtonGroup variant="contained" style={{marginLeft: "5vh", marginTop: "5vh"}}>
                                <Button onClick={() => this.setState({table: "students"})}>Students</Button>
                                <Button onClick={() => this.setState({table: "groups"})}>Groups</Button>
                                <Button onClick={() => this.setState({table: "teachers"})}>Teachers</Button>
                            </ButtonGroup>
                            <CreateNewItemDial handleChange={this.handleChangeDial}/>
                        </Grid>
                        {this.switchTable()}
                    </Grid>
                </Grid>
                <Alert isOpen={this.state.alertOpen}
                       alertMessage={this.state.alertMessage}
                       handleClose={this.hideAlert}/>
                <Success isOpen={this.state.successOpen}
                         successMessage={this.state.successMessage}
                         handleClose={this.hideSuccess}/>
                <CreateGroupDialog open={this.state.dialogOpen && this.state.dialogType === "groupDialog"}
                                   onClose={() => this.setState({dialogOpen: false})}
                                   showSuccess={this.showSuccess}/>
            </Grid>
        );
    }
}

export default Students;
