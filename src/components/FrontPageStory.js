import React from "react";
import { Link } from "react-router-dom";

export const FrontPageStory = ({props}) => {
    const story = props;
    console.log('story front page', story)
    return (
        <div className="front-page-story-container">
            <div>
                <img src="https://placehold.jp/150x150.png" className="logo" alt="The Tooth logo"/>
            </div>
            <h2 className="front-page-headline" value={story.story_id}>{story.story_title}</h2>
            <h3 className="front-page-story-deck">{story.story_subhead}</h3>
            <div className="front-page-author-container">
                <p className="front-page-author-name">By {story.story_author.author_name}</p>
                <p className="front-page-author-email">{story.story_author.author_email}</p>
            </div>
            <p className="front-page-story-led">{story.story_led} {story.story_led}</p>
            <div className="front-page-fieldset-contianer">
            <fieldset className="front-page-tag-container">
                <p>Tags: &nbsp;</p> 
                {story.tags.map((tag) => {
                    return (
                        <Link to={`search/${tag}`}><a>#{tag}</a></Link>
                    )
                })}
            </fieldset>
            </div>

        </div>
    )
};
