import * as React from "react";
import {Paper, TableContainer} from "@material-ui/core";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TablePagination from "@material-ui/core/TablePagination";
import backgroundPaper from "../../assets/sidebarBackground.jpeg";
import {ServiceProvider} from "../service/ServiceProvider";
import Avatar from "@material-ui/core/Avatar";
import Errors from "../error/Errors";
import EditIcon from '@material-ui/icons/Edit';
import Button from "@material-ui/core/Button";

export class StudentsTable extends React.Component {

    studentService;

    constructor(props) {
        super(props);
        const provider = ServiceProvider.provider();
        this.studentService = provider.getService(provider.service.STUDENT_SERVICE);
        this.state = {
            page: 0,
            size: 10,
            total: 0,
            students: []
        };
        this.getStudents();
    }

    getStudents = () => {
        this.studentService.getStudents(this.state.page, this.state.size)
            .then(response => response.data)
            .then(data => this.setData(data))
            .catch(reason => this.props.showAlert(Errors.getErrorMessage(reason)));
    };

    setData = (data) => {
        this.setState({
            students: data.content,
            page: data.number,
            total: data.totalElements
        });
    };

    handleChangePage = (event, page) => {
        this.setState({page: page});
        this.getStudents();
    };

    handleChangeRowsPerPage = (event) => {
        this.setState({size: event.target.value});
        this.getStudents();
    };

    paperStyle = {
        marginLeft: "5vh",
        marginTop: "5vh",
        width: "100%",
        backgroundImage: `url(${backgroundPaper})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover"
    };

    columns = [{id: 1, label: "Photo", format: data => <Avatar alt="Not found" src={data.user.pictureUrl}/>},
        {id: 2, label: "Full name", format: data => data.user.firstName + " " + data.user.lastName},
        {id: 3, label: "Group", format: data => data.group.parent.name},
        {id: 3, label: "Sub Group", format: data => data.group.name},
        {id: 4, label: "Date of starts", format: data => new Date(data.dateOfEnroll).toLocaleDateString()},
        {id: 5, label: "Email", format: data => data.user.email},
        {id: 6, label: "Actions", format: data => <Button><EditIcon/></Button>}];

    rowsPerPageOptions = [10, 20, 30];

    render() {
        return (
            <Paper style={this.paperStyle}>
                <TableContainer>
                    <TableHead>
                        <TableRow>
                            {this.columns.map(column => (
                                <TableCell key={column.id}>
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.students.map(row => {
                            return (
                                <TableRow hover tabIndex={-1} key={row.id}>
                                    {this.columns.map(column => {
                                        return (
                                            <TableCell key={column.id}>
                                                {column.format(row)}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                    <TablePagination
                        rowsPerPageOptions={this.rowsPerPageOptions}
                        component="div"
                        count={this.state.total}
                        rowsPerPage={this.state.size}
                        page={this.state.page}
                        onChangePage={this.handleChangePage}
                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    />
                </TableContainer>
            </Paper>
        );
    }
}

export default StudentsTable;
