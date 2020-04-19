import * as React from "react";
import Grid from "@material-ui/core/Grid";
import Fade from "@material-ui/core/Fade";
import {SubjectDetailsItem} from "./SubjectDetailsItem";

export class SubjectDetails extends React.Component {

    constructor(props, context) {
        super(props, context);
    }

    paperStyle = {
        marginLeft: "5vh",
        marginTop: "5vh",
        width: "80%"
    };

    onScheduleDelete = (subjectId) => {
        this.props.update(subjectId);
        this.props.showSuccess("Schedule was deleted");
    };

    render() {
        return (
            <Fade in={this.props.checked}>
                <Grid style={this.paperStyle}>
                    <Grid item container direction="row" spacing={3}>
                        {this.props.data?.map((item, index) => {
                            return <SubjectDetailsItem key={index} data={item}
                                                       onDelete={this.onScheduleDelete}/>
                        })}
                    </Grid>
                </Grid>
            </Fade>
        );
    }
}
