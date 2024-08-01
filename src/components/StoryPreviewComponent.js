import React from "react";
import { Link } from "react-router-dom";

export const StoryPreviewComponent = ({storyObj, primaryCat, subCat, authorSearchFlag}) => {

    console.log('storyObj', storyObj)
    return (
        <>

        
        <fieldset className="story-preview-fieldset" key={storyObj.story_id}>
            <legend></legend>
            {storyObj.image_flag === false ? null :
                <div className="story-preview-image">
                <img src="https://placehold.jp/350x200.png" className="story-preview-image" />
                </div>
            }
            <h3>
                <Link to={`/${primaryCat}/${subCat}/${storyObj.story_slug}/${storyObj.story_id}`}>{storyObj.story_title}</Link>
            </h3>
            <p>{storyObj.story_led}</p>
            <button>Read More</button>

            {authorSearchFlag === true ? null : 
                <fieldset className="story-preview-author-box">
                <p>By <Link to={`/search/author/${storyObj.author_id}`}>{storyObj.first_name} {storyObj.last_name}</Link> | {storyObj.public_role}</p>
                <p>{storyObj.email}</p>
                </fieldset>
            }

            {!storyObj.tags.length ? null : 
                

                <fieldset className="story-preview-tags-fieldset">
                    <legend>Tags:</legend>
                    {storyObj.tags.map((tag, index) => {
                        return (
                            <Link to={`/search/tag/${tag.tag}`} key={index}>#{tag.tag}</Link>
                        )
                    })}
                </fieldset>
                
            }



        </fieldset>
        </>
    )
};