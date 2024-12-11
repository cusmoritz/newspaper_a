import React from "react";
import { useState } from "react";
import { getPageViewsForOneStoryOneDay } from "../../api";

export const StoryPageViewsMono = () => {

    const [storyId, setStoryId] = useState(0);
    const [searchDate, setSearchDate] = useState("");
    const [searchResultsBool, setSerachResultsBool] = useState(false);
    const [pageViews, setPageViews] = useState({});
    const [pageViewResultsDate, setPageViewsResultDate] = useState("");
    const [viewHours, setViewHours] = useState([]);

    const searchForPageViews = async () => {
        const date = new Date(2024, 11, 7);
        const pageViews = await getPageViewsForOneStoryOneDay(storyId, date);
        if (pageViews) {
            //console.log('page views FE', pageViews);
            setPageViewsResultDate(`${pageViews.story_view_year}/${pageViews.story_view_month}/${pageViews.story_view_day}`);
            setPageViews(pageViews);
            setViewHours(pageViews.hours);
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
        <div className="page-views-admin-container">
            {!viewHours.length ? null : 
            <div>
                <p>Page views for story id {pageViews.story_id} on {pageViewResultsDate}</p>
                {viewHours.map((hour, index) => {
                    return (
                        <p>For hour {index+1}: {hour} views.</p>
                    )
                })}
            </div>
            }
        </div>
        </>
    );
};