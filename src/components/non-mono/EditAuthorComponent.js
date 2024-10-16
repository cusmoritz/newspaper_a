import React from "react";
import { useState } from "react";
import { editAuthorProfile } from "../../../api";

export const EditAuthorComponent = ({editAuthorBool, setEditAuthorBool, authorObj, loadPage}) => {
    const clearFields = () => {
        setFirstName("");
        setLastName("");
        setEmail("");
        setPublicRole("");
        setInternalRole(0);
        setTwitterProfile("");
        setFacebookProfile("");
        setOtherProfile("");
        setAuthorBlurb("");
        setEditAuthorBool(!editAuthorBool);
    };

    console.log(authorObj)

    const deleteAuthorEvent = () => {
        console.log('Are you sure you want to delete this author?')
    }

    const editAuthorEvent = async () => {
        const results = await editAuthorProfile({firstName, lastName, email, publicRole, internalRole, twitterProfile, facebookProfile, otherProfile, authorBlurb, authorId});
        if (results) {
            // alert to say update works
            setEditAuthorBool(!editAuthorBool);
            loadPage();
        }
        return results;
    }

    const [firstName, setFirstName] = useState(authorObj.first_name);
    const [lastName, setLastName] = useState(authorObj.last_name);
    const [email, setEmail] = useState(authorObj.email);
    const [publicRole, setPublicRole] = useState(authorObj.public_role);
    const [internalRole, setInternalRole] = useState(authorObj.internal_role);
    const [twitterProfile, setTwitterProfile] = useState(authorObj.twitter_profile);
    const [facebookProfile, setFacebookProfile] = useState(authorObj.facebook_profile);
    const [otherProfile, setOtherProfile] = useState(authorObj.other_profile);
    const [authorBlurb, setAuthorBlurb] = useState(authorObj.author_blurb);
    const [authorId, setAuthorId] = useState(authorObj.author_id);
    
    return (
        <>
        <div className="create-author-container">
            <fieldset>
                <label htmlFor="first-name-input" >First Name:</label>
                <input type="text" className="first-name-input" required value={firstName} onChange={(event) => setFirstName(event.target.value)}></input>
                <label htmlFor="last-name-input">Last Name:</label>
                <input type="text" className="last-name-input" required value={lastName} onChange={(event) => setLastName(event.target.value)}></input>
                <label htmlFor="email-input">Email:</label>
                <input type="text" className="email-input" required value={email} onChange={(event) => setEmail(event.target.value)}></input>
                <label htmlFor="public-role-input">Public Role (Business Writer, Intern, etc...)</label>
                <input className="public-role-input" placeholder="Music Critic" onChange={(event) => setPublicRole(event.target.value)} value={publicRole}></input>
                <label htmlFor="internal-role-input">Internal Role:</label>
                <select className="internal-role-input" required value={internalRole} onChange={(event) => setInternalRole(event.target.value)}>
                    <option value={3}>Other</option>
                    <option value={2}>Writer</option>
                    <option value={1}>Editor</option>
                    <option value={0}>Admin</option>
                </select>
                <label htmlFor="twitter-profile-input">Twitter Profile?</label>
                <input className="twitter-profile-input" onChange={(event) => setTwitterProfile(event.target.value)} value={twitterProfile}></input>
                <label htmlFor="facebook-profile-input">Facebook Profile?</label>
                <input className="facebook-profile-input" onChange={(event) => setFacebookProfile(event.target.value)} value={facebookProfile}></input>
                <label htmlFor="other-profile-input">Other Profile or Website?</label>
                <input className="other-profile-input" onChange={(event) => setOtherProfile(event.target.value)} value={otherProfile}></input>
                <label htmlFor="author-blurb-input">What would you like the people to know?</label>
                <textarea className="author-blurb-input" onChange={(event) => setAuthorBlurb(event.target.value)} placeholder="Limit your blurb to 300 words." maxLength="300" value={authorBlurb}></textarea>
            </fieldset>
            <button onClick={() => editAuthorEvent()}>Confirm Edits</button>
            <button onClick={()  => clearFields()}>Cancel Edits</button>
            <button className="delete-author" onClick={() => deleteAuthorEvent()}>Delete Author</button>
        </div>
        </>
    )
};