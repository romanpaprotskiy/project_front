import * as React from "react";
import {Fade, Paper, Table, TableBody, TableContainer, TableHead, TableRow} from "@material-ui/core";
import TableCell from "@material-ui/core/TableCell";
import {ServiceProvider} from "../service/ServiceProvider";
import backgroundPaper from "../../assets/sidebarBackground.jpeg";
import Errors from "../error/Errors";
import TablePagination from '@material-ui/core/TablePagination';
import TableFooter from "@material-ui/core/TableFooter";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";

export class SubjectsTable extends React.Component {

    subjectService;

    constructor(props, context) {
        super(props, context);
        const provider = ServiceProvider.provider();
        this.subjectService = provider.getService(provider.service.SUBJECT_SERVICE);
        this.state = {
            page: 0,
            size: 5,
            total: 0,
            rowsPerPage: 0,
            subjects: []
        };
        this.getSubjects(0, 5);
    }

    update = () => {
        this.getStudents(0, 5);
        this.setState({page: 0, size: this.state.size});
    };

    getSubjects = (page, size) => {
        this.subjectService.getSubjects(page, size)
            .then(response => response.data)
            .then(data => this.setData(data))
            .catch(reason => this.props.showAlert(Errors.getErrorMessage(reason)));
    };

    setData = (data) => {
        this.setState({
            subjects: data.content,
            total: data.metadata.totalElements,
            rowsPerPage: data.metadata.size
        });
    };

    handleChangePage = (event, newPage) => {
        this.setState({page: newPage});
        this.getSubjects(newPage, this.state.size);
    };

    handleChangeRowsPerPage = (event) => {
        this.setState({size: +event.target.value});
        this.getSubjects(0, +event.target.value);
    };

    columns = [
        {label: "ID", format: data => data.id},
        {label: "Course number", format: data => data.courseNumber ? data.courseNumber : "-"},
        {label: "Name", format: data => data.name},
        {label: "Actions", format: data => <Button><EditIcon/></Button>}
    ];

    rowsPerPageOptions = [5, 10, 15];

    paperStyle = {
        marginLeft: "5vh",
        marginTop: "5vh",
        width: "80%",
        backgroundImage: `url(${backgroundPaper})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover"
    };

    render() {
        return (
            <Fade in={this.props.checked}>
                <Paper style={this.paperStyle}>
                    <TableContainer>
                        <Table style={{maxHeight: "100vh"}}>
                            <TableHead>
                                <TableRow>
                                    {this.columns.map((column, index) => (
                                        <TableCell key={index}>
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.subjects.map(row => {
                                    return (
                                        <TableRow hover key={row.id} onClick={() => this.props.onRowClick(row.id)}>
                                            {this.columns.map(column => {
                                                return (
                                                    <TableCell key={column.label}>
                                                        {column.format(row)}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TablePagination
                                        rowsPerPageOptions={this.rowsPerPageOptions}
                                        count={this.state.total}
                                        rowsPerPage={this.state.rowsPerPage}
                                        page={this.state.page}
                                        onChangePage={this.handleChangePage}
                                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                    />
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </TableContainer>
                </Paper>
            </Fade>
        );
    }
}
