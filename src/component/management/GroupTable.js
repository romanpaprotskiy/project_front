import {ServiceProvider} from "../service/ServiceProvider";
import Errors from "../error/Errors";
import backgroundPaper from "../../assets/sidebarBackground.jpeg";
import {Fade, Paper, Table, TableContainer, TableFooter} from "@material-ui/core";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TablePagination from "@material-ui/core/TablePagination";
import * as React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";

export class GroupTable extends React.Component {

    managementService;

    constructor(props) {
        super(props);
        const provider = ServiceProvider.provider();
        this.managementService = provider.getService(provider.service.MANAGEMENT_SERVICE);
        this.state = {
            page: 0,
            size: 5,
            total: 0,
            groups: [],
            rowsPerPage: 0
        };
        this.getGroups(0, 5);
    }

    update = () => {
        this.getGroups(0, 5);
        this.setState({page: 0, size: this.state.size});
    };

    getGroups = (page, size) => {
        this.managementService.getGroups(page, size)
            .then(response => response.data)
            .then(data => this.setData(data))
            .catch(reason => this.props.showAlert(Errors.getErrorMessage(reason)));
    };

    setData = (data) => {
        this.setState({
            groups: data.content,
            total: data.metadata.totalElements,
            rowsPerPage: data.metadata.size
        });
    };

    handleChangePage = (event, newPage) => {
        this.setState({page: newPage});
        this.getGroups(newPage, this.state.size);
    };

    handleChangeRowsPerPage = (event) => {
        this.getGroups(0, +event.target.value);
        this.setState({size: +event.target.value});
        this.setState({page: 0});
    };

    getGuideFullName = (guide) => {
        return guide.firstName + " " + guide.lastName;
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

    columns = [
        {label: "Name", format: data => data.name},
        {label: "Count of students", format: data => data.countOfStudents},
        {label: "Guide photo", format: data => <Avatar alt="Not found" src={data.guide.pictureUrl}/>},
        {label: "Guide full name", format: data => this.getGuideFullName(data.guide)},
        {label: "Science title", format: data => data.guide.scienceTitleName},
        {label: "Actions", format: data => <Button><EditIcon/></Button>}];


    rowsPerPageOptions = [5, 10];

    render() {
        return (
            <Fade in={this.props.checked}>
                <Paper style={this.paperStyle}>
                    <TableContainer>
                        <Table>
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
                                {this.state.groups.map(row => {
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

export default GroupTable;
