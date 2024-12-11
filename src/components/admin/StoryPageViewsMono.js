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
                <svg height="400" width="100%">
                <line x1="0" y1="0" x2="0" y2="400" style={{stroke: "white", width: 3 }}/>
                {viewHours.map((hour, index) => {
                    console.log('hour, index', hour, index)
                    return (
                        <rect height={hour*10} width="25" x={index*30+10} y={400-(hour*10)-10} fill="blue">Name</rect>
                    )
                })}
                <line x1="0" y1="400" x2="1000" y2="400" style={{stroke: "white", width: 3}}/>
                </svg>
            </div>
            }
        </div>
        </>
    );
};