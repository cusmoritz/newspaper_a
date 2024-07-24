import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { fetchSecondaryCatStories } from "../api";
import { StoryPreviewComponent } from "./StoryPreviewComponent";

export const SecondaryCategoryComponent = ({primaryName}) => {

    const {secondaryName} = useParams();
    console.log('second', secondaryName, primaryName)
    // primary and secondary can be set from App.js?
    // fetch secondary cat, then stories with that ID.
    const [stories, setStories] = useState([]);

    let urlUnstructure = secondaryName.replace("-", " ");

    const fetchStories = async () => {
        const stories = await fetchSecondaryCatStories(primaryName, urlUnstructure);
        if (stories) {
            setStories(stories);
        }
    };

    const loadPage = async () => {
        await fetchStories();
    };

    useEffect(() => {
        loadPage();
    }, [secondaryName, primaryName]);

    return (
        <>
        This is the secondary category page component.
        {stories.length < 1 ? (<p>There are no stories for {urlUnstructure}.</p>) :
        stories.map((story, index) => {
            return (
                <StoryPreviewComponent storyObj={story} primaryCat={primaryName} subCat={secondaryName} key={index}/>
            )
        }) 
        }
        </>
    )
};