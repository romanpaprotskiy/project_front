import * as React from "react";
import {Fade, Paper, Table, TableContainer} from "@material-ui/core";
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
import TableFooter from "@material-ui/core/TableFooter";

export class StudentsTable extends React.Component {

    managementService;

    constructor(props) {
        super(props);
        const provider = ServiceProvider.provider();
        this.managementService = provider.getService(provider.service.MANAGEMENT_SERVICE);
        this.state = {
            page: 0,
            size: 5,
            total: 0,
            rowsPerPage: 0,
            students: []
        };
        this.getStudents(0, 5);
    }

    update = () => {
        this.getStudents(0, 5);
        this.setState({page: 0, size: this.state.size});
    };

    getStudents = (page, size) => {
        this.managementService.getStudents(page, size)
            .then(response => response.data)
            .then(data => this.setData(data))
            .catch(reason => this.props.showAlert(Errors.getErrorMessage(reason)));
    };

    setData = (data) => {
        this.setState({
            students: data.content,
            total: data.metadata.totalElements,
            rowsPerPage: data.metadata.size
        });
    };

    handleChangePage = (event, newPage) => {
        this.setState({page: newPage});
        this.getStudents(newPage, this.state.size);
    };

    handleChangeRowsPerPage = (event) => {
        this.setState({size: +event.target.value});
        this.getStudents(0, +event.target.value);
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

    columns = [{label: "Photo", format: data => <Avatar alt="Not found" src={data.user.pictureUrl}/>},
        {label: "Full name", format: data => data.user.firstName + " " + data.user.lastName},
        {label: "Group", format: data => data.group.parent !== null ? data.group.parent.name : data.group.name},
        {label: "Sub Group", format: data => data.group.parent !== null ? data.group.name : "-"},
        {label: "Date of starts", format: data => new Date(data.dateOfEnroll).toLocaleDateString()},
        {label: "Email", format: data => data.user.email},
        {label: "Phone", format: data => data.user.phone},
        {label: "Actions", format: data => <Button><EditIcon/></Button>}
        ];

    rowsPerPageOptions = [5, 10, 15];

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
                                {this.state.students.map(row => {
                                    return (
                                        <TableRow hover key={row.id}>
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

export default StudentsTable;
