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
            <Link to="/"><div className="primary-catagory-container">HOME</div></Link>
        {!catagories ? null : catagories.map((mainCat) => {
            return (
            <div className="primary-catagory-container" key={mainCat.primary_category_id}>
                <Link to={`/${mainCat.primary_category_name.toLowerCase()}`}>
                    <div className="primary-catagory" value={mainCat.primary_category_id}>{mainCat.primary_category_name}      
                    </div>
                </Link>
                <div className="secondary-catagory-container">
                    {mainCat.secondary.map((secondary) => {
                        let adjustedParam = secondary.secondary_category_name.replace(" ","-").toLowerCase();
                        return (
                            <Link 
                                key={secondary.secondary_category_id} 
                                to={`/${mainCat.primary_category_name.toLowerCase()}/${adjustedParam}`}>
                                <p 
                                    className="secondary-catagory">{secondary.secondary_category_name}</p>
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