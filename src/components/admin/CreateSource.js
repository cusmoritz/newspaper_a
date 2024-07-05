import React from "react";
import { useState } from "react";

export const CreateSource = () => {
    
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [occupation, setOccuaption] = useState("");
    const [race, setRace] = useState(0);
    const [age, setAge] = useState(0);
    const [elected, setElected] = useState(false);
    const [officer, setOfficer] = useState(false);
    const [phoneNum, setPhoneNum] = useState("");
    
    return (
        <>
        <h1>This is the create source page.</h1>
        <label>Create a new source</label>
        <fieldset>
            <label htmlFor="source-first-name">First name:</label>
            <input className="source-first-name" onChange={(event) => {setFirstName(event.target.value)}}></input>
            <label htmlFor="source-last-name">Last name:</label>
            <input className="source-last-name" onChange={(event) => {setLastName(event.target.value)}}></input>
            <label htmlFor="source-occupation">Occupation:</label>
            <input className="source-occupation" onChange={(event) => {setOccuaption(event.target.value)}}></input>
            {/* <label htmlFor="phone-number">Phone number</label>
            <input className="phone-number"></input> */}
            <label htmlFor="source-race">Race</label>
            <input className="source-race" onChange={(event) => {setRace(event.target.value)}}></input>
            <label htmlFor="source-age" type="number">Age</label>
            <input className="source-age" onChange={(event) => {setAge(event.target.value)}}></input>
            <label htmlFor="source-elected">Elected Official</label>
            <input className="source-elected" type="checkbox" onChange={(event) => {setElected(event.target.value)}}></input>
            <label htmlFor="source-police">Police Officer</label>
            <input className="source-police" type="checkbox" onChange={(event) => {setOfficer(event.target.value)}}></input>
            <label htmlFor="source-phone">Phone number</label>
            <input className="source-phone" type="number" onChange={(event) => {setPhoneNum(event.target.value)}}></input>
        </fieldset>
        </>

    )
};