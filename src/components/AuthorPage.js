import React, { useState } from "react";
import { Link } from "react-router-dom";
import { fetchAllAuthors } from "../api";
import { useEffect } from "react";
import { CreateAuthorComponent } from "./CreateAuthorComponent";

export const AuthorPage = () => {

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

    return (
        <div className="author-page-container">
            {!newAuthorBool ? 
                <button className="new-author-button" onClick={() => {setNewAuthorBool(true)}}>Create New Author</button> 
                : 
                null
            }
            {!newAuthorBool ? null : <CreateAuthorComponent setNewAuthorBool={setNewAuthorBool} newAuthorBool={newAuthorBool}/> }
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