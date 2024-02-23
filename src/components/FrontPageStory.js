import React from "react";

export const FrontPageStory = ({props}) => {
    const story = props;
    console.log('story', story)
    return (
        <div className="front-page-story-container">
            <h2 className="front-page-headline" value={story.story_id}>{story.story_head}</h2>
            <h3 className="front-page-story-deck">{story.story_deck}</h3>
            <div className="front-page-author-container">
                <p className="front-page-author-name">{story.story_author.author_name}</p>
                <p className="front-page-author-email">{story.story_author.author_email}</p>
            </div>
            <p className="front-page-story-led">{story.story_led} {story.story_led}</p>
            <fieldset className="front-page-tag-container">
                {story.story_tags.map((tag) => {
                    return (
                        <p>{tag}</p>
                    )
                })}
            </fieldset>
        </div>
    )
};
