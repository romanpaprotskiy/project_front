import * as React from "react";
import Fade from "@material-ui/core/Fade";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import Paper from "@material-ui/core/Paper";
import backgroundPaper from "../../assets/sidebarBackground.jpeg";
import {Table, TableContainer, TableFooter, Tooltip} from "@material-ui/core";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TablePagination from "@material-ui/core/TablePagination";
import DeleteIcon from "@material-ui/icons/Delete";
import Grid from "@material-ui/core/Grid";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import {ServiceProvider, ServiceProvider as serviceProvider} from "../service/ServiceProvider";

export class EventsTable extends React.Component {

    eventService;

    constructor(props, context) {
        super(props, context);
        this.state = {
            page: 0,
            size: 5,
            total: 0,
            events: [],
            rowsPerPage: 0
        };
        const serviceProvider = ServiceProvider.provider();
        this.eventService = serviceProvider.getService(serviceProvider.service.EVENT_SERVICE);
        this.getEvents();
    }

    getEvents = () => {
        this.eventService.getEvents()
            .then(response => response.data)
            .then(data => this.setState({events: data}));
    };

    paperStyle = {
        marginLeft: "5vh",
        marginTop: "5vh",
        width: "85%",
        backgroundImage: `url(${backgroundPaper})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover"
    };

    handleChangePage = (event, page) => {
        this.setState({page: page});
    };

    handleChangeRowsPerPage = (event) => {
        this.setState({size: event.target.value});
    };

    formatNumber = (number) => {
        return number < 10 ?  "0" + number : number;
    };

    formatDateTime = (dateTime) => {
        return dateTime[0] + "-" + this.formatNumber(dateTime[1]) + "-"
            +  this.formatNumber(dateTime[2]) + "T"
            +  this.formatNumber(dateTime[3]) + ":"
            + this.formatNumber(dateTime[4]);
    };

    columns = [{label: "Summary", format: data => data.title},
        {label: "Start date", format: data => this.formatDateTime(data.startDate)},
        {label: "End date", format: data => this.formatDateTime(data.endDate)},
        {label: "Attendees", format: data => this.usersGroup(data.attendees)},
        {
            label: "Actions", format: data => <Grid direction="row">
                <Button><EditIcon/></Button>
                <Button><DeleteIcon onClick={() => this.eventService.deleteEvent(data.eventId)}/></Button>
            </Grid>
        }];

    usersGroup = (data) => {
        return (
            <AvatarGroup max={8}>
                {data?.map((item, index) => {
                    return <Tooltip key={index}
                                    title={item.firstName + " " + item.lastName}>
                        <Avatar src={item.pictureUrl}
                                alt={item.firstName + " " + item.lastName}
                                style={{width: "4.5vh", height: "4.5vh"}}/>
                    </Tooltip>
                })}
            </AvatarGroup>
        );
    }

    rowsPerPageOptions = [5, 10];

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
                                {this.state.events.map(row => {
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
