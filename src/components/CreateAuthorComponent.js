import react from "react";
import { useState } from "react";

export const CreateAuthorComponent = ({setNewAuthorBool, newAuthorBool}) => {
    
    const clearFields = () => {
        setFirstName("");
        setLastName("");
        setEmail("");
        setPublicRole("");
        setInternalRole(0);
        setNewAuthorBool(!newAuthorBool);
    };

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [publicRole, setPublicRole] = useState("");
    const [internalRole, setInternalRole] = useState(3);

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
            </fieldset>
            <button onClick={() => submitNewWriter()}>Submit</button>
            <button onClick={()  => clearFields()}>Cancel</button>
        </div>
    )
};