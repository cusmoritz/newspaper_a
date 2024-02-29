import React, { useState } from "react";
import { Link } from "react-router-dom";
import { fetchAllAuthors } from "../api";
import { useEffect } from "react";

export const AuthorPage = () => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [everyone, setEveryone] = useState([]);
    const [newAuthorBool, setNewAuthorBool] = useState(false)

    // useEffect(() => {
    //     fetchEveryAuthor();
    // }, [])

    const clearFields = () => {
        setNewAuthorBool(false);
        setFirstName("");
        setLastName("");
        setEmail("");
        setRole("");
    };

    return (
        <div className="author-page-container">
            <div className="current-authors-container">
                <h4>Current authors:</h4>
                <button onClick={() => {fetchEveryAuthor()}}>fetch all</button>
                {everyone.map((author) => {
                    return(
                        <fieldset className="author-container" value={author.author_id}>
                        <p>{author.author_first} {author.author_last}</p>
                        <p>{author.author_email}</p>
                        <p>Role: {author.author_role}</p>
                        </fieldset>
                    )
                })}
            </div>
            {!newAuthorBool ? 
                <button className="new-author-button" onClick={() => {setNewAuthorBool(true)}}>Create New Author</button> 
                : 
                null
            }
            {!newAuthorBool ? null :
            <div className="create-author-container">
            <fieldset>
                <label htmlFor="first-name-input" >First Name:</label>
                <input type="text" className="first-name-input" required value={firstName} onChange={(event) => setFirstName(event.target.value)}></input>
                <label htmlFor="last-name-input">Last Name:</label>
                <input type="text" className="last-name-input" required value={lastName} onChange={(event) => setLastName(event.target.value)}></input>
                <label htmlFor="email-input">Email:</label>
                <input type="text" className="email-input" required value={email} onChange={(event) => setEmail(event.target.value)}></input>
                <label htmlFor="role-input">Role:</label>
                <select className="role-input" required value={role} onChange={(event) => setRole(event.target.value)}>
                    <option>Writer</option>
                    <option>Intern</option>
                    <option>Admin</option>
                </select>
            </fieldset>
            <button onClick={() => submitNewWriter()}>Submit</button>
            <button onClick={()  => clearFields()}>Cancel</button>
            </div>
            }

        </div>
    );
};