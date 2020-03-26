import * as React from "react";
import {Fade, Paper, Table, TableContainer} from "@material-ui/core";
import backgroundPaper from "../../assets/sidebarBackground.jpeg";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TablePaginationActions from "@material-ui/core/TablePagination/TablePaginationActions";
import TablePagination from "@material-ui/core/TablePagination";
import {ServiceProvider} from "../service/ServiceProvider";
import Errors from "../error/Errors";

export class TeachersTable extends React.Component{

    managementService;

    constructor(props, context) {
        super(props, context);
        const provider = ServiceProvider.provider();
        this.managementService = provider.getService(provider.service.MANAGEMENT_SERVICE);
        this.state = {
            page: 0,
            size: 10,
            total: 0,
            teachers: []
        };
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

    getTeachers = () => {
        this.managementService.getTeachersPage(this.state.page, this.state.size)
            .then(response => response.data)
            .then(data => this.setData(data))
            .catch(reason => this.props.showAlert(Errors.getErrorMessage(reason)));
    };

    setData = (data) => {
        this.setState({
            teachers: data.content,
            page: data.number,
            total: data.totalElements
        });
    };

    handleChangePage = (event, page) => {
        this.setState({page: page});
        this.getTeachers();
    };

    handleChangeRowsPerPage = (event) => {
        this.setState({size: event.target.value});
        this.getTeachers();
    };

    columns = [{id: 1, label: "Photo", format: data => <Avatar alt="Not found" src={data.pictureUrl}/>},
        {id: 2, label: "Full name", format: data => data.firstName + " " + data.lastName},
        {id: 3, label: "Employed from", format: data => data.employedFrom},
        {id: 4, label: "Science title", format: data => data.scienceTitleName},
        {id: 5, label: "Email", format: data => data.email},
        {id: 6, label: "Phone", format: data => data.phone},
        {id: 7, label: "Actions", format: data => <Button><EditIcon/></Button>}];

    rowsPerPageOptions = [5, 10, 15];

    render() {
        return (
            <Fade in={this.props.checked}>
                <Paper style={this.paperStyle}>
                    <TableContainer>
                        <Table style={{maxHeight: "100vh"}}>
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
                                {this.state.teachers.map(row => {
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
                                count={this.state.total}
                                rowsPerPage={this.state.size}
                                page={this.state.page}
                                ActionsComponent={TablePaginationActions}
                                onChangePage={this.handleChangePage}
                                onChangeRowsPerPage={this.handleChangeRowsPerPage}
                            />
                        </Table>
                    </TableContainer>
                </Paper>
            </Fade>
        );
    }
}


export default TeachersTable;
