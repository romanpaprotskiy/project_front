import {ServiceProvider} from "../service/ServiceProvider";
import Errors from "../error/Errors";
import backgroundPaper from "../../assets/sidebarBackground.jpeg";
import {Paper, TableContainer} from "@material-ui/core";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TablePagination from "@material-ui/core/TablePagination";
import * as React from "react";
import Collapse from "@material-ui/core/Collapse";

export class GroupTable extends React.Component {

    studentService;

    constructor(props) {
        super(props);
        const provider = ServiceProvider.provider();
        this.studentService = provider.getService(provider.service.STUDENT_SERVICE);
        this.state = {
            page: 0,
            size: 10,
            total: 0,
            groups: [],
            collapsedRow: true
        };
        this.getGroups();
    }

    getGroups = () => {
        this.studentService.getGroups(this.state.page, this.state.size)
            .then(response => response.data)
            .then(data => this.setData(data))
            .catch(reason => this.props.showAlert(Errors.getErrorMessage(reason)));
    };

    setData = (data) => {
        this.setState({
            groups: data.content,
            page: data.number,
            total: data.totalElements
        });
    };

    handleChangePage = (event, page) => {
        this.setState({page: page});
        this.getGroups();
    };

    handleChangeRowsPerPage = (event) => {
        this.setState({size: event.target.value});
        this.getGroups();
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

    columns = [{id: 1, label: "Name", format: data => data.name},
        {id: 2, label: "Count of students", format: data => data.countOfStudents}];


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
                        {this.state.groups.map(row => {
                            return (
                                <TableRow hover tabIndex={-1} key={row.id}>
                                    {this.columns.map(column => {
                                        return (
                                            <TableCell key={column.id}>
                                                {column.format(row)}
                                                <Collapse
                                                    in={this.state.collapsedRow}
                                                    timeout='auto'>
                                                    Test
                                                </Collapse>
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

export default GroupTable;
