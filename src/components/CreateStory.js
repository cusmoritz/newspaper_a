import React from "react";
import { useState } from "react";

export const CreateStory = () => {
    return(
        <div className="create-story-container">
            <h3>Create a story by populating the fields below.</h3>
            <label>New story fields:</label>
            <fieldset>
                
                <label htmlFor="title-input">title:</label>
                <input className="title-input"></input>
            </fieldset>
        </div>
    );
};