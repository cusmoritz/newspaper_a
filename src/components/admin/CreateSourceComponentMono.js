import React from "react";
import { useState } from "react";
import { submitNewSource } from "../../api";

export const CreateSourceComponentMono = ({setCreateBool}) => {
    
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [sourceOccupation, setOccuaption] = useState("");
    const [sourceRace, setRace] = useState(0);
    const [sourceAge, setAge] = useState(0);
    const [sourceElectedBool, setElected] = useState(false);
    const [sourcePoliceBool, setOfficer] = useState(false);
    const [sourcePhone, setPhoneNum] = useState("");
    const [sourceOgContactDate, setOgContactDate] = useState("");
    const [sourceRecentContactDate, setSourceRecentContactDate] = useState("");
    const [sourceLocation, setSourceLocation] = useState("");

    const createNewSource = async () => {
        const sourceName = `${firstName} ${lastName}`;
        const newSource = await submitNewSource({sourceName, sourceOccupation, sourceRace, sourceAge, sourceElectedBool, sourcePoliceBool, sourcePhone, sourceLocation});
        return newSource; 
        // recall to get all sources after confirmation
        // also close the createSource form
        // also add a message field?
    };

    return (
        <fieldset>
            <legend>Create new source</legend>
            <label htmlFor="first-name">First name:</label>
            <input className="first-name" value={firstName} onChange={(event) => {setFirstName(event.target.value)}}></input>
            <p></p>
            <label htmlFor="last-name">Last name:</label> 
            <input className="last-name" value={lastName} onChange={(event) => {setLastName(event.target.value)}}></input>
            <p></p>
            <label htmlFor="occupation">Occupation: </label>
            <input className="occupation" value={sourceOccupation} onChange={(event) => {setOccuaption(event.target.value)}}></input>
            <p></p>

            <label htmlFor="ethnicity">Race / Ethnicity:</label>
            <select className="ethnicity" value={sourceRace} onChange={(event) => {setRace(event.target.value)}}>
            <option value={null}>Select an option</option>    
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
            <option value={6}>6</option>
            </select>
            <p></p>
            <label htmlFor="age">Age:</label>
            <input className="source-age" type="number" value={sourceAge} onChange={(event) => {setAge(event.target.value)}}></input>
            <p></p>
            <label htmlFor="elected">Elected official?</label>
            <input className="elected" type="checkbox" value={sourceElectedBool} onChange={(event) => {setElected(event.target.value)}}></input>
            <p></p>
            <label htmlFor="phone">Phone number: </label>
            <input className="source-phone" type="number" value={sourcePhone} onChange={(event) => {setPhoneNum(event.target.value)}}></input>
            <p></p>
            <label htmlFor="location">Location (City, State):</label>
            <input className="source-location" type="text" value={sourceLocation} onChange={(e) => {e.preventDefault(); setSourceLocation(e.target.value)}}></input>
            <p></p>
            <label htmlFor="most-recent">Select the most recent contact date: </label>
            <input type="date" className="most-recent"/>
            <p></p>
            <label htmlFor="original-date">Check this box if the 'Most Recent Contact Date' is also the first time this person has been contacted for a story:</label>
            <input className="original-date" type="checkbox"/>
            <p></p>
            <button onClick={createNewSource}>Submit Source</button> &nbsp;
            <button onClick={() => setCreateBool(false)}>Cancel</button>
        </fieldset>
    )
};