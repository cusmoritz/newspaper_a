import React from "react";
import { useState, useEffect } from "react";
import { fetchCurrentSources } from "../../api";
import { EditSourceComponent } from "./EditSourceComponent";
import { submitNewSource } from "../../api";

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
    const [sourceRecentContactDate, setSourceRecentContactDate] = useState("");
    const [createBool, setCreateBool] = useState(false);
    const [editBool, setEditBool] = useState(false);
    const [allSources, setAllSources] = useState([]);
    const [sourceObj, setSourceObj] = useState({});
    const [sourceLocation, setSourceLocation] = useState("");

    const createNewSource = async () => {
        const sourceName = `${firstName} ${lastName}`;
        const newSource = await submitNewSource({sourceName, sourceOccupation, sourceRace, sourceAge, sourceElectedBool, sourcePoliceBool, sourcePhone, sourceLocation});
        return newSource; 
        // recall to get all sources after confirmation
        // also close the createSource form
        // also add a message field?
    };

    const editSource = (sourceObj) => {
        setEditBool(true)
        setSourceObj(sourceObj);
    }

    const createSourceEvent = () => {
        setCreateBool(!createBool)
    }

    const fetchAllCurrentSources = async () => {
        const currentSources = await fetchCurrentSources();
        if (currentSources) {
            setAllSources(currentSources);
            console.log('sources', currentSources);
        }
    };
    
    const loadPage = async () => {
        fetchAllCurrentSources();
    }

    useState(() => {
        loadPage();
    },[]);

    return (
        <div className="admin-source-page-container">
        {editBool === false ? null : <EditSourceComponent sourceObj={sourceObj} editBool={editBool} setEditBool={setEditBool}/>}
        <h1>This is the create source page.</h1>
        
        {createBool === false ? <button onClick={createSourceEvent}>Create New Source</button> : 
            <fieldset className="create-source-fieldset">
                <legend>Create New Source</legend>
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
                <label htmlFor="source-location">Location (City, State):</label>
                <input className="source-location" type="text" value={sourceLocation} onChange={(e) => {e.preventDefault(); setSourceLocation(e.target.value)}}></input>
                <label htmlFor="most-recent-contact">Select the most recent contact date.</label>
                <input type="date" className="most-recent-contact"/>
                <label htmlFor="original-date-checkbox">Check this box if the 'Most Recent Contact Date' is also the first time this person has been contacted for a story.</label>
                <input className="original-date-checkbox" type="checkbox"/>
                <button onClick={createNewSource}>Submit Source</button>
                <button onClick={createSourceEvent}>Cancel</button>
            </fieldset>
        }
        

        <div className="current-source-container">
        {!allSources ? null : 
            allSources.map((source) => {
            return (
            <fieldset key={source.id} className="source-fieldset">
            <legend>Source {source.source_id}</legend>
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
                <div className="source-age">{source.source_phone_num}</div>
            <label htmlFor="source-location">Location: </label>
                <div className="source-location">{source.source_location}</div>
            <label htmlFor="source-race">Race: </label>
                <div className="source-race">{source.source_race}</div>
            <label htmlFor="source-police-office">Police Officer: </label>
                <div className="source-police-office">{source.source_police_officer.toString()}</div>
            <label htmlFor="source-elected-official">Elected Official: </label>
                <div className="source-elected-official">{source.source_elected_official.toString()}</div>
            {/* <div>{source.source_most_recent_contact_date.getMonth()} {source.source_most_recent_contact_date.getDate()}, {source.source_most_recent_contact_date.getFullYear()}</div> */}
            <label htmlFor="source-recent-date">Most Recent Contact Date: </label>
                <div className="source-recent-date">{source.source_most_recent_contact_date}</div>
            <label htmlFor="source-original-date">Original Contact Date: </label>
                <div className="source-original-date">{source.source_original_contact_date}</div>
            <button>See source-related stories</button>
            <button onClick={(e) => {e.preventDefault(); editSource(source)}}>Edit Source</button>
            </fieldset>
            
            )
            })
        }
        </div>
    </div>
    )
};