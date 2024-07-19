import React from "react";

export const StoryPreviewComponent = ({storyObj}) => {

    console.log('storyObj', storyObj)
    return (
        <>
        <fieldset className="story-preview-fieldset" key={storyObj.story_id}>
            <legend></legend>
            <h3>{storyObj.story_title}</h3>
            <p>{storyObj.story_led}</p>
            <fieldset className="story-preview-author-box">
            <p>By {storyObj.first_name} {storyObj.last_name} | {storyObj.public_role}</p>
            <p>{storyObj.email}</p>
            </fieldset>
            
            {storyObj.tags.length < 1 ? null : 
            <fieldset className="story-preview-tags-fieldset">
                <legend>Tags:</legend>
                {storyObj.tags.map((tag) => {
                    return (
                        <p>#{tag.tag}</p>
                    )
                })}
            </fieldset>
            }


        </fieldset>
        </>
    )
};