import React, { useState } from "react";
import { Link } from "react-router-dom";
import { fetchAllAuthors } from "../../api";
import { useEffect } from "react";
import { CreateAuthorComponent } from "./CreateAuthorComponent";
import { EditAuthorComponentMono } from "./EditAuthorComponentMono";

export const AuthorPage = () => {

    const [everyone, setEveryone] = useState([]);
    const [newAuthorBool, setNewAuthorBool] = useState(false);
    const [editAuthorBool, setEditAuthorBool] = useState(false);
    const [editAuthoObj, setEditoAuthorObj] = useState({});

    const loadPage = async () => {
        const writers = await fetchAllAuthors();
        if (writers) {
            writers.sort((writer) => {writer.author_id});
            setEveryone(writers);
        }
    };

    const editAuthorAction = (authorObj) => {
        setEditAuthorBool(true);
        setEditoAuthorObj(authorObj);
    }

    useEffect(() => {
        loadPage();
    }, [])

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
            <button className="new-author-button" 
            onClick={() => {setNewAuthorBool(true)}}>
                Create New Author
            </button> 
            : 
            null
        }
        {!newAuthorBool ? null : <CreateAuthorComponent setNewAuthorBool={setNewAuthorBool} newAuthorBool={newAuthorBool}/> }
        {!editAuthorBool ? null : <EditAuthorComponentMono editAuthorBool={editAuthorBool} setEditAuthorBool={setEditAuthorBool} authorObj={editAuthoObj} loadPage={loadPage}/> }
        {(newAuthorBool == false && editAuthorBool == false) ?
            <div className="current-authors-container">
            <h4>Current authors:</h4>
            {/* <button onClick={() => {setEveryone(authors)}}>Fetch all local</button>
            <button onClick={() => {fetchAllAuthors()}}>fetch all</button> */}
            {everyone.map((author) => {
                let role;
                if (author.internal_role == 0) {
                    role = "Admin";
                } else if (author.internal_role == 1) {
                    role = "Editor";
                } else if (author.internal_role == 2) {
                    role = "Writer";
                } else {
                    role = "Other";
                }
                return(
                    <fieldset key={author.author_id} className="author-container" value={author.author_id}>
                    <legend>{author.first_name} {author.last_name}</legend>
                    <button className="edit-author-button" onClick={() => editAuthorAction(author)}>Edit Author</button>
                    <p>Email: {author.email}</p>
                    <p>Public role: {author.public_role}</p>
                    <p>Internal role: {role}</p>
                    <p className="twitter-profile">Twitter profile: {author.twitter_profile}</p>
                    <p>Facebook profile: {author.facebook_profile}</p>
                    <p>Other profile / website: {author.other_profile}</p>
                    <p>Author blurb: {author.author_blurb}</p>
                    </fieldset>
                )
            })}
            </div> 
            : null
        }
        
    </div>
);
};