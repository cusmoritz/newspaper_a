import React from "react";
import { useState } from "react";

export const EditResourceMono = ({resource, editResourceBool, setEditBool}) => {

    const [newDisplayText, setNewDisplayText] = useState("");
    const [newUrl, setNewUrl] = useState("");
    const [newCategory, setNewCategory] = useState(0);

    const cancelEditing = () => {
        setNewDisplayText("");
        setNewUrl("");
        setNewCategory(0);
        setEditBool(false);
    };
    console.log('new resource?', resource)
    return (
        <fieldset id="edit-resource">
            <legend>Place new fields here:</legend>
            <p>Note: Only fields that have been edited will be updated. Other fields will remain the same.</p>
            <label htmlFor="new-display">Display text:</label>
            <input className="new-display" type="text" 
                //value={newDisplayText}
                onChange={(e) => setNewDisplayText(e.target.value)}
                >
            </input>
            <p>Current display text: <i>{resource.resource_display_text}</i></p>
            <p></p>
            <label htmlFor="new-url">URL:</label>
            <input className="new-url" type="text" 
                //value={newUrl} 
                onChange={(e) => setNewUrl(e.target.value)}
                >
            </input>
            <p>Current URL: <i><a href={resource.resource_url}>{resource.resource_url}</a></i></p>
            <p></p>
            <label>New Display Category:</label>
            <select onChange={(e) => setNewCategory(e.target.value)}>
                <option value={null}>Select an option</option>
                <option value={null}>Housing</option>
                <option value={null}>Voting</option>
                <option value={null}>Criminal Justice</option>
                <option value={null}>Food Assistance</option>
                <option value={null}>Elected Government</option>
                <option value={null}>CO - Statewide</option>
                <option value={null}>Employment / Unionization</option>
                <option value={null}>Education</option>
                <option value={null}>Newspaper Internal Resources / Public Resources</option>
            </select>
            <p>Current Category: <i>{resource.resource_name}</i></p>
            <button onClick={() => cancelEditing}>Cancel</button> &nbsp;
            <button>Submit</button>
        </fieldset>
    );
};