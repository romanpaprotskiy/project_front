import React from 'react';
import Login from "./component/login/Login";
import {BrowserRouter} from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <Login/>
        </BrowserRouter>
    );
}

export default App;
