import React from "react";
import { useState } from "react";

export const StoryPageViewsMono = () => {

    const [storyId, setStoryId] = useState(0);

    return (
        <>
        <h2>Story page views</h2>
        <label htmlFor="story-id-select">Input a story ID to see page view statistics:</label>
        <input className="story-id-select" type="number"/>
        &nbsp;
        <button>Search</button>
        </>
    );
};