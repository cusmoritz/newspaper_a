import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { fetchSecondaryCatStories } from "../api"
import { Link } from "react-router-dom";

export const SecondaryCatPage = () => {

    const {primaryCat} = useParams();
    const {secondaryCat} = useParams();
    const primary = primaryCat.toUpperCase();
    const secondary = secondaryCat.toUpperCase();

    const [stories, setStories] = useState([]);

    const fetchPrimarySecondary = async () => {
        const secondaryStories = await fetchSecondaryCatStories(primary, secondary);
        if (secondaryStories) {
            setStories(secondaryStories);
        }
    }

    const loadPage = () => {
        // fetch stories for primary/secondary
        fetchPrimarySecondary();
        //console.log('stories front', stories)
    }

    useEffect(() => {
        loadPage();
    }, [primary, secondary]);

    return (
        <div className="secondary-catagory-page--container">
            <h3 className="primary-catagory-header">{secondary}</h3>
            {!stories ? null : 
            stories.map((story) => {
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
        This is a secondary catagory page for {primary} / {secondary}.
        </div>
    )
}