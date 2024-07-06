import React from "react";
import { useState } from "react";

export const CreateSource = () => {
    
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [sourceOccupation, setOccuaption] = useState("");
    const [sourceRace, setRace] = useState(0);
    const [sourceAge, setAge] = useState(0);
    const [sourceElectedBool, setElected] = useState(false);
    const [sourcePoliceBool, setOfficer] = useState(false);
    const [sourcePhone, setPhoneNum] = useState("");
    const [sourceOgContactDate, setOgContactDate] = useState("");

    const submitNewSource = async () => {
        const sourceName = `${firstName} ${lastName}`;
        const newSource = await createNewSource({sourceName, sourceOccupation, sourceRace, sourceAge, sourceElectedBool, sourcePoliceBool, sourcePhone});
        return newSource;
    }
    
    return (
        <>
        <h1>This is the create source page.</h1>
        <label>Create a new source</label>
        <fieldset>
            <label htmlFor="source-first-name">First name:</label>
            <input className="source-first-name" value={firstName} onChange={(event) => {setFirstName(event.target.value)}}></input>
            <label htmlFor="source-last-name">Last name:</label>
            <input className="source-last-name" value={lastName} onChange={(event) => {setLastName(event.target.value)}}></input>
            <label htmlFor="source-occupation">Occupation:</label>
            <input className="source-occupation" value={sourceOccupation} onChange={(event) => {setOccuaption(event.target.value)}}></input>
            {/* <label htmlFor="phone-number">Phone number</label>
            <input className="phone-number"></input> */}
            <label htmlFor="source-race">Race</label>
            <input className="source-race" value={sourceRace} onChange={(event) => {setRace(event.target.value)}}></input>
            <label htmlFor="source-age">Age</label>
            <input className="source-age" type="number" value={sourceAge} onChange={(event) => {setAge(event.target.value)}}></input>
            <label htmlFor="source-elected">Elected Official</label>
            <input className="source-elected" type="checkbox" value={sourceElectedBool} onChange={(event) => {setElected(event.target.value)}}></input>
            <label htmlFor="source-police">Police Officer</label>
            <input className="source-police" type="checkbox" value={sourcePoliceBool} onChange={(event) => {setOfficer(event.target.value)}}></input>
            <label htmlFor="source-phone">Phone number</label>
            <input className="source-phone" type="number" value={sourcePhone} onChange={(event) => {setPhoneNum(event.target.value)}}></input>
        </fieldset>
        <button onClick={submitNewSource}>Submit Source</button>
        </>

    )
};