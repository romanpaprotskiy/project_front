import MuiAlert from "@material-ui/lab/Alert";
import React from "react";

function Notify(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default Notify;
