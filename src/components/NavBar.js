import React from "react";
import { fetchFrontPageCatsSubcats } from "../api";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const NavBar = () => {
    
    const [catagories, setCatagories] = useState([]);

    const loadPage = async () => {
        const allCatagories = await fetchFrontPageCatsSubcats();
        if (allCatagories) {
            setCatagories(allCatagories);
        }
    };

    useEffect(() => {
        loadPage();
    }, [])

    return (
        <nav className="nav-bar-container">
            <div className="primary-catagory-container">Home</div>
        {catagories.map((mainCat) => {
            return (
            <div className="primary-catagory-container" key={mainCat.primary_catagory_id}>
                <Link to={`/${mainCat.primary_catagory_name.toLowerCase()}`}><div className="primary-catagory" value={mainCat.primary_catagory_id}>{mainCat.primary_catagory_name}      
                </div></Link>
                <div className="secondary-catagory-container">
                    {mainCat.secondary.map((secondary) => {
                        return (
                            <Link 
                                to={`/${mainCat.primary_catagory_name.toLowerCase()}/${secondary.secondary_catagory_name.toLowerCase()}`}>
                                <p key={secondary.secondary_catagory_id} className="secondary-catagory">{secondary.secondary_catagory_name}</p>
                            </Link>
                        )
                    })}
                </div>
            </div>
            )
        })}            
        </nav>
    )
};