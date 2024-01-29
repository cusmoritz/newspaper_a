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
            <Link to="/createstory"><button>New story</button></Link>
            <Link to="/storystats"><button>Story stats</button></Link>
            <Link to="/createauthor"><button>Create Author</button></Link>
        </div>
    );
};