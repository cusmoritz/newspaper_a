import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { SearchFilterComponentMono } from "./SearchFiltersComponentMono";

export const SearchPageMono = () => {

    const [searchBool, setSearchBool] = useState(false);

    return (
        <div>
            <h2>Advanced Story Search</h2>
            <button><Link to={'/'}>Back</Link></button>
            <p></p>
            {searchBool ? null : 
            <SearchFilterComponentMono />
            }
        </div>
    )
};