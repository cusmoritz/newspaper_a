import React from "react";
import { useState } from "react";
import { getPageViewsForOneStoryOneDay } from "../../api";

export const StoryPageViewsMono = () => {

    const [storyId, setStoryId] = useState(0);
    const [searchDate, setSearchDate] = useState("");
    const [searchResultsBool, setSerachResultsBool] = useState(false);
    const [pageViews, setPageViews] = useState({});

    const searchForPageViews = async () => {
        const date = new Date(2024, 11, 7);
        const pageViews = await getPageViewsForOneStoryOneDay(storyId, date);
        if (pageViews) {
            setPageViews(pageViews);
            return;
        } else {
            return false;
        }
    };

    return (
        <>
        <h2>Story page views</h2>
        {!searchResultsBool ? 
        <>
            <label htmlFor="story-id-select">Input a story ID to see page view statistics:</label>
            <input className="story-id-select" type="number" onChange={(e) => setStoryId(e.target.value)}/>
            &nbsp;
            <button onClick={searchForPageViews}>Search</button>
        </>
        :
        null
        }
        </>
    );
};