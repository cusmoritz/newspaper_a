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
            <Link to="/createstory"><button>New story</button></Link>
            <Link to="/storystats"><button>Story stats</button></Link>
            <Link to="/authorpage"><button>Author Page</button></Link>
            <Link to="/image-upload"><button>Image Upload</button></Link>
            <Link to="/sources"><button>Check Sources</button></Link>
        </div>
    );
};