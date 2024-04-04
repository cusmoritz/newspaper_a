import React from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { fetchPrimaryCatStories } from "../api";

export const PrimaryCatPage = () => {

    const {primaryCat} = useParams();
    const primary = primaryCat.toUpperCase();

    const [stories, setStories] = useState([]);

    const breadcrumbs = [];

    const fetchPrimaryStories = async () => {
        const catStories = await fetchPrimaryCatStories(primaryCat);
        if (catStories) {
            setStories(catStories)
        };
        // console.log('stories front', stories)
    };
    
    const loadPage = async () => {
        fetchPrimaryStories();
    };

    useEffect(() => {
        loadPage();
    }, []);
    return (
        <div className="primary-catagory-page-container">
            <h3 className="primary-catagory-header">{primary}</h3>
            {!stories ? null : 
            stories.map((story) => {
                return (
                    <div>
                        {story.story_title}
                    </div>
                )
            })
            }
        </div>
    )
}