import React from "react";
import { useState } from "react";

export const CreateNewResourceMono = ({setCreateNewBool}) => {

    const [newDisplayText, setNewDisplayText] = useState("");
    const [newUrl, setNewUrl] = useState("");
    const [newCategory, setNewCategory] = useState(0);
    const [adminBool, setAdminBool] = useState(false);

    const cancelCreateResource = () => {
        setNewDisplayText("");
        setNewUrl("");
        setNewCategory(0);
        setAdminBool(false);
        setCreateNewBool(false);
    }

    const submitNewResource = () => {
        if (newDisplayText.length < 1 || newUrl.length < 1 || newCategory <= 0) {
            return false;
        } else {
            newResourceSubmit({resource_display_text: newDisplayText, resource_url: newUrl, resource_category: newCategory, admin_bool: adminBool})
        }
    }

    return (
        <fieldset>
            <legend>Create a new resource</legend>
            <label htmlFor="new-display-texy">Display text:</label>
            <input type="text" required onChange={(e) => {setNewDisplayText(e.target.value)}} />
            <p></p>
            <label htmlFor="new-url">URL:</label>
            <input type="text" required onChange={(e) => setNewUrl(e.target.value)} />
            <p></p>
            <label htmlFor="new-admin-bool">Admin Resource?</label>
            <input type="checkbox" onChange={(e) => setAdminBool(!adminBool)} />
            <p></p>
            <label htmlFor="new-category">Category: </label>
            <select onChange={(e) => setNewCategory(e.target.value)} required>
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
            <p></p>
            <button onClick={cancelCreateResource}>Cancel</button> &nbsp;
            <button onClick={submitNewResource}>Submit</button>
        </fieldset>
    )
}