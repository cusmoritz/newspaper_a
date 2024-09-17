import React from "react";
import { useEffect } from "react";
import { Link } from 'react-router-dom';
import { fetchAllAuthors } from "../../api";


export const AdminHome = (props) => {

    // this needs to be our validation for admins
    // useEffect(() => {
    //     checkForAdminPrivledge();
    // }, []);

    return (
        <div className="admin-home-container">
            <h1>Admin page</h1>
            {/* {!props.globalBreakingBool ? null : 
            <div>
                <p>There is breaking news.</p>
            </div>
            } */}
            <button><Link to="/createstory">New story</Link></button>
            <button><Link to="/storystats">Story stats</Link></button>
            <button><Link to="/authorpage">Author Page</Link></button>
            <button><Link to="/image-upload">Image Upload</Link></button>
            <button><Link to="/sources">Check Sources</Link></button>
        </div>
    );
};