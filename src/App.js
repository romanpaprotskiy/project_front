import React from 'react';
import Login from "./component/login/Login";
import {Route, Switch} from "react-router";
import Main from "./component/main/Main";

class App extends React.Component {

    render() {
        return (
            <Switch>
                <Route exact path="/" component={Login}/>
                <Route path="/main" component={Main}/>
            </Switch>
        );
    }
}

export default App;
