import react from "react";
import { useState } from "react";
import { submitNewAuthor } from "../../api";

export const CreateAuthorComponent = ({setNewAuthorBool, newAuthorBool}) => {
    
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
        setNewAuthorBool(!newAuthorBool);
    };

    const submitNewWriter = async () => {
        const result = await submitNewAuthor({firstName, lastName, email, publicRole, internalRole, twitterProfile, facebookProfile, otherProfile, authorBlurb});
        return result;
    }

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [publicRole, setPublicRole] = useState("");
    const [internalRole, setInternalRole] = useState(3);
    const [twitterProfile, setTwitterProfile] = useState("");
    const [facebookProfile, setFacebookProfile] = useState("");
    const [otherProfile, setOtherProfile] = useState("");
    const [authorBlurb, setAuthorBlurb] = useState("");

    return (
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
                <label htmlFor="twitter-profile-input">Twitter Profile?</label>
                <input className="twitter-profile-input" onChange={(event) => setTwitterProfile(event.target.value)}></input>
                <label htmlFor="facebook-profile-input">Facebook Profile?</label>
                <input className="facebook-profile-input" onChange={(event) => setFacebookProfile(event.target.value)}></input>
                <label htmlFor="other-profile-input">Other Profile or Website?</label>
                <input className="other-profile-input" onChange={(event) => setOtherProfile(event.target.value)}></input>
                <label htmlFor="author-blurb-input">What would you like the people to know?</label>
                <textarea className="author-blurb-input" onChange={(event) => setAuthorBlurb(event.target.value)} placeholder="Limit your blurb to 300 words." maxLength="300"></textarea>
            </fieldset>
            <button onClick={() => submitNewWriter()}>Submit</button>
            <button onClick={()  => clearFields()}>Cancel</button>
        </div>
    )
};