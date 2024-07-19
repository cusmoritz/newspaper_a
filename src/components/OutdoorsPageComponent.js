import React, { useState } from "react";
import { useEffect } from "react";
import { fetchPrimaryCatStories } from "../api";
import { StoryPreviewComponent } from "./StoryPreviewComponent";

export const OutdoorsPageComponent = () => {

    const [stories, setStories] = useState([]);

    const loadPage = async () => {
        const primaryStories = await fetchPrimaryCatStories(4);
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
        This is the outdoors page component.
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