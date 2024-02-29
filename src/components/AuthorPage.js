import React, { useState } from "react";
import { Link } from "react-router-dom";
import { fetchAllAuthors } from "../api";
import { useEffect } from "react";

export const AuthorPage = () => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [publicRole, setPublicRole] = useState("");
    const [internalRole, setInternalRole] = useState(3);
    const [everyone, setEveryone] = useState([]);
    const [newAuthorBool, setNewAuthorBool] = useState(false)

    // useEffect(() => {
    //     fetchEveryAuthor();
    // }, [])

    const authors = [ //internal role: 0 = admin, 1 = editor, 2 = writer, 3 = other?
    // here for testing
    {firstN: "marcus", lastN: "moritz", email: "marcus@thetooth.com", public_role: "editor", internal_role: 0},
    {firstN: "john", lastN: "laconte", email: "john@thetooth.com", public_role: "writer", internal_role: 2},
    {firstN: "ross", lastN: "leonhart", email: "ross@thetooth.com", public_role: "assistant editor", internal_role: 0},
    {firstN: "jaron", lastN: "jaron", email: "jaron@thetooth.com", public_role: "intern", internal_role: 3},
    {firstN: "scott", lastN: "miller", email: "scott@thetooth.com", public_role: "business writer", internal_role: 2},
    {firstN: "ricky", lastN: "martinez", email: "ricky@thetooth.com", public_role: "music writer", internal_role: 2}
]

    const clearFields = () => {
        setNewAuthorBool(false);
        setFirstName("");
        setLastName("");
        setEmail("");
        setPublicRole("");
        setInternalRole(0);
    };

    return (
        <div className="author-page-container">
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
                    <label htmlFor="public-role-input">Public Role (Business Writer, Intern, etc...)</label>
                    <input className="public-role-input" placeholder="Music Critic" onChange={(event) => setPublicRole(event.target.value)}></input>
                    <label htmlFor="internal-role-input">Internal Role:</label>
                    <select className="internal-role-input" required value={internalRole} onChange={(event) => setInternalRole(event.target.value)}>
                        <option value={3}>Other</option>
                        <option value={2}>Writer</option>
                        <option value={1}>Editor</option>
                        <option value={0}>Admin</option>
                    </select>
                </fieldset>
                <button onClick={() => submitNewWriter()}>Submit</button>
                <button onClick={()  => clearFields()}>Cancel</button>
            </div>
            }
            <div className="current-authors-container">
                <h4>Current authors:</h4>
                <button onClick={() => {setEveryone(authors)}}>Fetch all local</button>
                <button onClick={() => {fetchEveryAuthor()}}>fetch all</button>
                {everyone.map((author) => {
                    return(
                        <fieldset key={author.author_id} className="author-container" value={author.author_id}>
                        <legend>{author.firstN} {author.lastN}</legend>
                        
                        <p>Email: {author.email}</p>
                        <p>Public role: {author.public_role}</p>
                        <p>Internal role: {author.internal_role}</p>
                        </fieldset>
                    )
                })}
            </div>
        </div>
    );
};