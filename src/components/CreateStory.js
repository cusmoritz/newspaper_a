import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { submitNewStory } from "../api";

export const CreateStory = () => {

    const [title, setTitle] = useState("");
    const [subhead, setSubhead] = useState("");
    const [story, setStory] = useState("");
    const [tags, setTags] = useState("");
    const [author, setAuthor] = useState("");
    const [slug, setSlug] = useState("");


    window.addEventListener('load', function() {
        document.querySelector('input[type="file"]').addEventListener('change', function() {
            if (this.files && this.files[0]) {
                var img = document.querySelector('#myImg');
                img.onload = () => {
                    URL.revokeObjectURL(img.src);  // no longer needed, free memory
                }
      
                img.src = URL.createObjectURL(this.files[0]); // set src to blob url
            }
        });
      });

      const submitStory = async () => {
        const result = await submitNewStory({title, subhead, story, tags, author});
        return result;
      }

      const validateSlug = async () => {
            const cleanSlug = slug.toLowerCase().replace(" ", "-");
            const valid = await checkSlug(cleanSlug);
            
      }

      const clearFields = () => {
        setTitle("");
        setSubhead("");
        setStory("");
        setTags("");
        setAuthor("");
        setSlug("");
      }

    return(
        <div className="create-story-container">
            <h3>Create a story by populating the fields below.</h3>
            <Link to="/" onClick={() => clearFields()}><button>Cancel</button></Link>
            <label>New story fields:</label>
            <fieldset>
                
                <label htmlFor="title-input">title:</label>
                <input className="title-input" value={title} onChange={(event) => setTitle(event.target.value)}></input>
                <label htmlFor="author-dropdown">Author:</label>
                <select className="author-dropdown" onChange={(event) => setAuthor(event.target.value)}>
                    <option>Author A</option>
                    <option>Author B</option>
                    <option>Author C</option>
                    <option>Author D</option>
                    <option>Author E</option>
                </select>
                <label htmlFor="subhead-input">Subhead:</label>
                <input className="subhead-input" value={subhead} onChange={(event) => setSubhead(event.target.value)}></input>
                
                <label htmlFor="story-input">Story:</label>
                <textarea value={story} onChange={(event) => setStory(event.target.value)}></textarea>
                
                <label htmlFor="tag-input">Add tags to this story. To add multiple tags, serparate tags with a comma.</label>
                <input className="tag-input" value={tags} onChange={(event) => setTags(event.target.value)}></input>

                <label htmlFor="slug-input">Add a potential SEO URL slug for this story: </label>
                <input onChange={((event) => setSlug(event.target.value))} className="slug-input" />
                <button onClick={(() => )}>Check Slug</button>
                
            </fieldset>
            <fieldset>
                <label htmlFor="feature-image-input" id="feature-upload">Feature image:</label>
                <input type="file" className="feature-image-input"></input>
                <label htmlFor="additional-image-input">Additional images:</label>
                <input type="file" className="additional-image-input"></input>
                <br></br>
                <img id="myImg" src="#" height="200px" width="200px"/>
            </fieldset>
            <div>

                {/* TODO: add photo search feature */}

            </div>
            <button onClick={() => submitStory()}>Submit new story</button>
        </div>
    );
};