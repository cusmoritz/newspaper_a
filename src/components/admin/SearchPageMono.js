import React from "react";
import { useState } from "react";
import { SearchFilterComponentMono } from "./SearchFiltersComponentMono";

export const SearchPageMono = () => {

    const [searchBool, setSearchBool] = useState(false);

    return (
        <div>
            <h2>Advanced Story Search</h2>

            {searchBool ? null : 
            <SearchFilterComponentMono />
            }
        </div>
    )
};