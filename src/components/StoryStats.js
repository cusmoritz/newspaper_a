import React from "react";
import {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import {fetchAllStoryStatsAdmin, fetchOneStoryStats} from "../api";

export const StoryStats = () => {

    const allStoryBoiler = async () => {
        const setAllStorys = await fetchAllStoryStatsAdmin();
    }

    // TODO: is it better to fetch each story individually?

    const oneStoryStats = async (storyId) => {
        try {
            const getOneStats = await fetchOneStoryStats(storyId);
            if (!getOneStats) {
                return {error: "There was a problem fetching one story"};
                setOneStory({});
            } else {
                return;
            }
        } catch (error) {
            throw error;
        }
    };

    const [allStorys, setAllStorys] = useState([]);
    const [oneStory, setOneStory] = useState({});

    useEffect(() => {
        allStoryBoiler();
    }, [])

    return (
        <div>
            <Link to="/"><button>Back</button></Link>
            {allStorys.forEach((story) => {
                const storyDate = `${story.original_create_date.getMonth() + 1} / ${story.original_create_date.getDate()} / ${story.original_create_date.getFullYear()}`;
                return (
                    <fieldset className="story-boiler-container">
                        <h2>{story.story_head}</h2>
                        <p>{story.story_author}</p>
                        <p>{storyDate}</p>
                        <p>Active: {story.story_active_flag}</p>
                        <button onClick={(event) => {oneStoryStats(story.storyId)}}>Expand</button>
                    </fieldset>
                )
            })}
            These are story statistics.
        </div>
    )
}