import React from "react";
import { useEffect } from "react";
import { Link } from 'react-router-dom';


export const AdminHome = () => {

    // this needs to be our validation for admins
    // useEffect(() => {
    //     checkForAdminPrivledge();
    // }, []);

    return (
        <div className="admin-home-container">
            <h1>Admin page</h1>
            <button><Link to="/createstory">Create story</Link></button>
            <button><Link to="/storystats">Story stats</Link></button>
        </div>
    );
};