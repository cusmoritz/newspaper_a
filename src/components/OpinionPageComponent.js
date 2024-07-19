import React, { useState } from "react";
import { useEffect } from "react";
import { fetchPrimaryCatStories } from "../api";
import { StoryPreviewComponent } from "./StoryPreviewComponent";

export const OpinionPageComponent = () => {

    const [stories, setStories] = useState([]);

    const loadPage = async () => {
        const primaryStories = await fetchPrimaryCatStories(2);
        if (primaryStories) {
            setStories(primaryStories);
        }
        console.log('stories', primaryStories)
    };

    useEffect(() => {
        loadPage();
    }, [])

    return (
        <>
        This is the opinion page component.
        {!stories ? <div>There are no stories for this category.</div> :
        stories.map((story, index) => {
            return (
                <StoryPreviewComponent storyObj={story} key={index}/>
            )
        }) 
        }
        </>
    )
};