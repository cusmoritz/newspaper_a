import React from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { fetchPrimaryCatStories } from "../api";
import { Link } from "react-router-dom";

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
                console.log('story', story)
                return (
                    <fieldset className="catagory-page-story-container" key={story.story_id}>
                        <h3>{story.story_title}</h3>
                        <h4>{story.story_subhead}</h4>
                        <div className="story-author-box">
                            <p className="story-author">{story.first_name} {story.last_name} | {story.email}</p>
                            <p className="story-author-role">{story.public_role}</p>
                        </div>
                        <p>{story.story_led}</p>
                        <div className="story-tag-container">
                            <fieldset className="story-tag-fieldset">
                                <p>Tags: &nbsp;</p> 
                                {story.tags.map((tag) => {
                                return (
                                    <Link to={`search/tag/${tag.tag}`} key={tag.tag}>
                                        #{tag.tag}
                                    </Link>
                                )
                                })}
                            </fieldset>
                        </div>
                    </fieldset>
                )
            })
            }
        </div>
    )
}