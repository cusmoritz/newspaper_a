import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { SearchFilterComponentMono } from "./SearchFiltersComponentMono";

export const SearchPageMono = () => {

    const [stories, setStories] = useState([]);
    const [searchBool, setSearchBool] = useState(false);
    const [searchDisplayQuery, setSearchDisplayQuery] = useState("");

    return (
        <div>
            <h2>Advanced Story Search</h2>
            <button><Link to={'/'}>Back</Link></button> &nbsp;
            <p></p>
            {searchBool ? null : 
            <SearchFilterComponentMono stories={stories} setStories={setStories} setSearchDisplayQuery={setSearchDisplayQuery}/>
            }

            {stories.length < 1 ? 
            <div>There are no results for that search.
            </div>
            : 
            <div>
                <p>Search results for {searchDisplayQuery}:
                </p>
                <p>{stories.length}</p>
            </div>
            }
        </div>
    )
};