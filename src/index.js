import React from "react";
import ReactDOM from "react-dom/client";
import {App} from './App'
import { Navigate } from "react-router";

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(
    <Navigate>
        <App />
    </Navigate>

);