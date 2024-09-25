import React from "react";
import { useState } from "react";
import { sendEditedResource } from "../../api";

export const EditResourceMono = ({resource, editResourceBool, setEditBool}) => {

    const [newDisplayText, setNewDisplayText] = useState("");
    const [newUrl, setNewUrl] = useState("");
    const [newCategory, setNewCategory] = useState(0);

    // const [submitDisplayText, setDisplayText] = useState("");
    // const [submitUrl, setSubmitUrl] = useState("");
    // const [submitCategory, setSubmitCategory] = useState(0);

    const cancelEditing = () => {
        setNewDisplayText("");
        setNewUrl("");
        setNewCategory(0);
        setEditBool(false);
    };

    const submitEditedResource = async () => {
        if (newDisplayText.length < 1) {
            setNewDisplayText(resource.resource_display_text);
        }
        if (newUrl.length < 1) {
            setNewUrl(resource.resource_url);
        }
        if (newCategory <= 0) {
            setNewCategory(resource.resource_category)
        }
        let editedResource = await sendEditedResource({id: resource.resource_id, resource_display_text: newDisplayText, resource_url: newUrl, resource_category: newCategory})
    }
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
                <option value={0}>Select an option</option>
                <option value={1}>Housing</option>
                <option value={2}>Voting</option>
                <option value={3}>Criminal Justice</option>
                <option value={4}>Food Assistance</option>
                <option value={5}>Elected Government</option>
                <option value={6}>CO - Statewide</option>
                <option value={7}>Employment / Unionization</option>
                <option value={8}>Education</option>
                <option value={9}>Newspaper Internal Resources / Public Resources</option>
            </select>
            <p>Current Category: <i>{resource.resource_name}</i></p>
            
            <button onClick={cancelEditing}>Cancel</button> &nbsp;
            <button onClick={submitEditedResource}>Submit</button>
        </fieldset>
    );
};