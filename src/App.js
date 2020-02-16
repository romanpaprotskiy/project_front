import React from 'react';
import Login from "./component/login/Login";
import {Route, Switch} from "react-router";
import Main from "./component/main/Main";
import {MuiPickersUtilsProvider} from "@material-ui/pickers";
import moment from '@date-io/moment';

class App extends React.Component {

    render() {
        return (
            <MuiPickersUtilsProvider utils={moment}>
                <div>
                    <Switch>
                        <Route exact path="/" component={Login}/>
                        <Route path="/main" component={Main}/>
                    </Switch>
                </div>
            </MuiPickersUtilsProvider>
        );
    }
}

export default App;
