import React from "react";
import {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import {fetchEveryStoryStats, fetchOneStoryStats} from "../api";

export const StoryStats = () => {

    const allStoryStats = async () => {
        const setAllStorys = await fetchEveryStoryStats();
    }

    // TODO: is it better to fetch each story individually?

    const oneStoryStats = async (storyId) => {
        try {
            const setOneStory = await fetchOneStoryStats(storyId);
            if (!setOneStory) {
                return {error: "There was a problem fetching one story"};
            } else {
                return;
            }
        } catch (error) {
            throw error;
        }
    }

    const [allStorys, setAllStorys] = useState([]);
    const [oneStory, setOneStory] = useState({});

    useEffect(() => {
        allStoryStats();
    }, [])

    return (
        <div>
            <Link to="/"><button>Back</button></Link>
            These are story statistics.
        </div>
    )
}