import React from "react";
import { useState, useEffect } from "react";
import { fetchCurrentSources } from "../../api";
import { EditSourceComponentMono } from "./EditSourceComponentMono";
import { submitNewSource } from "../../api";
import { Link } from "react-router-dom";

export const AdminSourceMono = () => {
    
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
            //console.log('sources', currentSources);
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
        {editBool === false ? null : <EditSourceComponentMono sourceObj={sourceObj} editBool={editBool} setEditBool={setEditBool}/>}
        <h2>Sources</h2>
        <button><Link to={'/'}>Back</Link></button> &nbsp;
        {createBool === false ? <button onClick={createSourceEvent}>Create New Source</button> : 
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
                <button onClick={createSourceEvent}>Cancel</button>
        </fieldset>
        }
        
        <div>
            <table>
                <tbody>
            {!allSources ? null : 
            allSources.map((source, index) => {
            return (
                <tr key={index}>
                    <td>
    <details>
    <summary>{source.source_name}</summary>
        {/* <p>Name: {source.source_name}</p> */}
        <p>Occupation: {source.source_occupation}</p>
    
    {source.source_previous_occupation == null ? null : 
    source.source_previous_occupation.map((previous, index) => {
        return (
            <p>Previous occupation: {previous}</p>
        )
    })
    }
    <p>Age: {source.source_age}</p>
    
    <p>Phone number: {source.source_phone_num}</p>

    <p>Location: {source.source_location}</p>

    <p>Race: {source.source_race}</p>

    <p>Police officer? {source.source_police_officer.toString()}</p>

    <p>Elected office? {source.source_elected_official.toString()}</p>

    {/* <div>{source.source_most_recent_contact_date.getMonth()} {source.source_most_recent_contact_date.getDate()}, {source.source_most_recent_contact_date.getFullYear()}</div> */}
    <p>Most recent contact date: {source.source_most_recent_contact_date}</p>

    <p>Original contact date: {source.source_original_contact_date}</p>

    <Link to={`/sources/related-stories/${source.source_id}`}>
        <button>See source-related stories</button>
    </Link>
    <button onClick={(e) => {e.preventDefault(); editSource(source)}}>Edit Source</button>
    </details>
                    </td>
                </tr>
            )})
        }
                </tbody>
            </table>
        </div>
    </div>
    )
};