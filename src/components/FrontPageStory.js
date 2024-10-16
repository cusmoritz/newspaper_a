import React from "react";
import { Link } from "react-router-dom";

export const FrontPageStory = ({props}) => {
    const story = props;
    //console.log('one story in FrontPageStory', story)
    let newPrim = story.category.primary.name.toLowerCase().replaceAll(" ", "-");
    let newSec = story.category.secondary.name.toLowerCase().replaceAll(" ", "-");
    return (
        <div className="front-page-story-container" id={story.story_id}>
            <div>
                {/* <a href={`http://localhost.com/3000/${story.story_title}`}>#</a> */}
                <img src="https://placehold.jp/500x400.png" className="logo" alt="The Tooth logo"/>
            </div>
            <h2 className="front-page-headline" value={story.story_id}>
                <Link to={`/${newPrim}/${newSec}/${story.story_slug}/${story.story_id}`}>{story.story_title}</Link>
                {/* :primary/:secondary/:slug/:storyId */}
            </h2>
            <h3 className="front-page-story-deck">{story.story_subhead}</h3>
            <p className="front-page-story-led">{story.story_led}</p>
            <div className="front-page-author-container">
                <p className="front-page-author-name" 
                value={story.author_id}>
                    By <Link to={`/search/author/${story.author_id}`}>{story.first_name} {story.last_name}</Link> | 
                </p>
                <p className="front-page-author-email">{story.email}</p>
            </div>
            <div className="front-page-fieldset-contianer">
                <fieldset className="front-page-tag-container">
                    <p>Tags: &nbsp;</p> 
                    {story.tags.map((tag, index) => {
                        return (
                            <Link to={`/search/tag/${tag}`} key={`"${tag}${index}"`}>#{tag}</Link>
                        )
                    })}
                </fieldset>
            </div>

        </div>
    )
};
