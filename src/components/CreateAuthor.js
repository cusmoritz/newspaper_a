import React from "react";
import { Link } from "react-router-dom";

export const CreateAuthor = () => {

    return (
        <div className="create-author-container">
            <button><Link to="/">Cancel</Link></button>
            <fieldset>
                <label htmlFor="first-name-input" >First Name:</label>
                <input type="text" className="first-name-input" required></input>
                <label htmlFor="last-name-input">Last Name:</label>
                <input type="text" className="last-name-input" required></input>
                <label htmlFor="email-input">Email:</label>
                <input type="text" className="email-input" required></input>
                <label htmlFor="role-input">Role:</label>
                <select className="role-input" required>
                    <option>Writer</option>
                    <option>Intern</option>
                    <option>Admin</option>
                </select>
            </fieldset>
            <button type="submit">Submit</button>
        </div>
    )
}