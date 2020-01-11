import React from 'react';
import './App.css';
import Login from "./component/login/login";
import {BrowserRouter} from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <Login/>
        </BrowserRouter>
    );
}

export default App;
