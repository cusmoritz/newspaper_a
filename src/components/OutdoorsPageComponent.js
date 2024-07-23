import React, { useState } from "react";
import { useEffect } from "react";
import { fetchPrimaryCatStories } from "../api";
import { StoryPreviewComponent } from "./StoryPreviewComponent";

export const OutdoorsPageComponent = () => {

    const [stories, setStories] = useState([]);

    const loadPage = async () => {
        const primaryStories = await fetchPrimaryCatStories(4);
        if (primaryStories) {
            for (let i = 0; i < primaryStories.length; i++) {
                console.log('prim i', primaryStories[i])
                let newSecondary = primaryStories[i].secondary.secondary_category_name.replace(" ", "-");
                console.log('newSecondary', newSecondary)
                primaryStories[i].secondary.secondary_category_name = newSecondary;
            }
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
                <StoryPreviewComponent storyObj={story} primaryCat={story.primary.primary_category_name.toLowerCase()} subCat={story.secondary.secondary_category_name.toLowerCase()} key={index}/>
            )
        }) 
        }
        </>
    )
};