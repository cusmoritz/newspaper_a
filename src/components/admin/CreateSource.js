import React from "react";
import { useState, useEffect } from "react";
import { fetchCurrentSources } from "../../api";

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
    const [createBool, setCreateBool] = useState(false);
    const [allSources, setAllSources] = useState([]);

    const submitNewSource = async () => {
        const sourceName = `${firstName} ${lastName}`;
        const newSource = await createNewSource({sourceName, sourceOccupation, sourceRace, sourceAge, sourceElectedBool, sourcePoliceBool, sourcePhone});
        return newSource;
    }

    const fetchAllCurrentSources = async () => {
        const currentSources = await fetchCurrentSources();
        if (currentSources) {
            setAllSources(currentSources);
            console.log('sources', currentSources);
        }
    };

    //const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    const loadPage = async () => {
        fetchAllCurrentSources();
    }

    useState(() => {
        loadPage();
    },[]);

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
            <label htmlFor="source-race">Race / Ethnicity</label>
            <input className="source-race" value={sourceRace} onChange={(event) => {setRace(event.target.value)}}></input>
            <label htmlFor="source-age">Age</label>
            <input className="source-age" type="number" value={sourceAge} onChange={(event) => {setAge(event.target.value)}}></input>
            <label htmlFor="source-elected">Elected Official</label>
            <input className="source-elected" type="checkbox" value={sourceElectedBool} onChange={(event) => {setElected(event.target.value)}}></input>
            <label htmlFor="source-police">Police Officer?</label>
            <input className="source-police" type="checkbox" value={sourcePoliceBool} onChange={(event) => {setOfficer(event.target.value)}}></input>
            <label htmlFor="source-phone">Phone number</label>
            <input className="source-phone" type="number" value={sourcePhone} onChange={(event) => {setPhoneNum(event.target.value)}}></input>
        </fieldset>
        <button onClick={submitNewSource}>Submit Source</button>

        {!allSources ? null : 
            allSources.map((source) => {
            return (
            <fieldset key={source.id}>
            <label htmlFor="source-name">Name: </label>
                <div className="source-name">{source.source_name}</div>
            <label htmlFor="source-occupation">Occupation: </label>
                <div className="source-occupation">{source.source_occupation}</div>
            {source.source_previous_occupation == null ? null : 
            source.source_previous_occupation.map((previous, index) => {
                return (
                    <>
                    <label htmlFor="source-previous-occupation">Previous Occupations: </label>
                    <div key={index} className="`source-previous-occupation">{previous}</div>
                    </>
                )
            })
            }
            <label htmlFor="source-age">Age: </label>
                <div className="source-age">{source.source_age}</div>

            <label htmlFor="source-age">Phone Number: </label>
                <div>{source.source_phone_num}</div>
            <label htmlFor="source-race">Race: </label>
                <div>{source.source_race}</div>
            <label htmlFor="source-police-office">Police Officer: </label>
                <div className="source-police-office">{source.source_police_officer.toString()}</div>
            <label htmlFor="source-elected-official">Elected Official: </label>
                <div className="source-elected-official">{source.source_elected_official.toString()}</div>
            {/* <div>{source.source_most_recent_contact_date.getMonth()} {source.source_most_recent_contact_date.getDate()}, {source.source_most_recent_contact_date.getFullYear()}</div> */}
            <label htmlFor="source-recent-date">Most Recent Contact Date: </label>
                <div className="source-recent-date">{source.source_most_recent_contact_date}</div>
            <label htmlFor="source-original-date">Original Contact Date: </label>
                <div className="source-original-date">{source.source_original_contact_date}</div>
            </fieldset>
            )
            })
        }
        </>
    )
};