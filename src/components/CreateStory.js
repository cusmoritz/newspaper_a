import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

export const CreateStory = () => {

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

    return(
        <div className="create-story-container">
            <h3>Create a story by populating the fields below.</h3>
            <button><Link to="/">Cancel</Link></button>
            <label>New story fields:</label>
            <fieldset>
                
                <label htmlFor="title-input">title:</label>
                <input className="title-input"></input>
                <label htmlFor="author-dropdown">Author:</label>
                <select className="author-dropdown">
                    <option>Author A</option>
                    <option>Author B</option>
                    <option>Author C</option>
                    <option>Author D</option>
                    <option>Author E</option>
                </select>
                <label htmlFor="subhead-input">Subhead:</label>
                <input className="subhead-input"></input>
                <label htmlFor="story-input">Story:</label>
                <textarea></textarea>
            </fieldset>
            <fieldset>
                <label htmlFor="feature-image-input" id="feature-upload">Feature image:</label>
                <input type="file" className="feature-image-input"></input>
                <label htmlFor="additional-image-input">Additional images:</label>
                <input type="file" className="additional-image-input"></input>
                <br></br>
                <img id="myImg" src="#" height="200px" width="200px"/>
            </fieldset>
        </div>
    );
};