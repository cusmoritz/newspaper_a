import React from "react";
import {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import fetchEveryStoryStats from "../api";

export const StoryStats = () => {

    const fetchAllStoryStats = async () => {
        const setAllStorys = await fetchEveryStoryStats();
    }

    // TODO: is it better to fetch each story individually?

    const [allStorys, setAllStorys] = useState([]);

    useEffect(() => {
        fetchAllStoryStats();
    }, [])

    return (
        <div>
            <Link to="/"><button>Back</button></Link>
            These are story statistics.
        </div>
    )
}