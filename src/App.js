import React from 'react';
import Login from "./component/login/Login";
import {Route, Switch} from "react-router";

class App extends React.Component {

    render() {
        return (
            <Switch>
                <Route exact path="/" component={Login}/>
            </Switch>
        );
    }
}

export default App;
