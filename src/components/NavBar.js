import React from "react";
import { fetchFrontPageCatsSubcats } from "../api";
import { useState, useEffect } from "react";

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
        {catagories.map((mainCat) => {
            return (
            <div>
                <div key={mainCat.primary_catagory_id} value={mainCat.primary_catagory_id}>{mainCat.primary_catagory_name}      
                </div>                   
                <div>
                    {mainCat.secondary.map((secondary) => {
                        return (
                            <p>{secondary.secondary_catagory_name}</p>
                        )
                    })}
                </div>
            </div>
            )
        })}            
        </nav>
    )
};