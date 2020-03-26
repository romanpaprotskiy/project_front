import {ServiceProvider} from "../service/ServiceProvider";
import Errors from "../error/Errors";
import backgroundPaper from "../../assets/sidebarBackground.jpeg";
import {Fade, Paper, Table, TableContainer} from "@material-ui/core";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TablePagination from "@material-ui/core/TablePagination";
import * as React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import TablePaginationActions from "@material-ui/core/TablePagination/TablePaginationActions";

export class GroupTable extends React.Component {

    managementService;

    constructor(props) {
        super(props);
        const provider = ServiceProvider.provider();
        this.managementService = provider.getService(provider.service.MANAGEMENT_SERVICE);
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
        this.managementService.getGroups(this.state.page, this.state.size)
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
        {id: 1, label: "Name", format: data => data.name},
        {id: 2, label: "Count of students", format: data => data.countOfStudents},
        {
            id: 3, label: "Guide photo", format: data => <Avatar alt="Not found"
                                                                 src={data.guide.pictureUrl}/>
        },
        {id: 4, label: "Guide full name", format: data => this.getGuideFullName(data.guide)},
        {id: 5, label: "Science title", format: data => data.guide.scienceTitleName},
        {id: 6, label: "Actions", format: data => <Button><EditIcon/></Button>}];


    rowsPerPageOptions = [5, 10, 15];

    render() {
        return (
            <Fade in={this.props.checked}>
                <Paper style={this.paperStyle}>
                    <TableContainer>
                        <Table>
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
                                ActionsComponent={TablePaginationActions}
                                rowsPerPage={this.state.size}
                                page={this.state.page}
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

export default GroupTable;
