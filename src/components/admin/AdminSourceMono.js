import React from "react";
import { useState, useEffect } from "react";
import { fetchCurrentSources } from "../../api";
import { EditSourceComponentMono } from "./EditSourceComponentMono";
import { CreateSourceComponentMono } from "./CreateSourceComponentMono";
import { submitNewSource } from "../../api";
import { Link } from "react-router-dom";

export const AdminSourceMono = () => {

    const [createBool, setCreateBool] = useState(false);
    const [editBool, setEditBool] = useState(false);
    const [allSources, setAllSources] = useState([]);
    const [sourceObj, setSourceObj] = useState({});

    const editSource = (sourceObj) => {
        setEditBool(true)
        setSourceObj(sourceObj);
    }

    // const createSourceEvent = () => {
    //     setCreateBool(!createBool)
    // }

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

        <h2>Sources</h2>

        <button><Link to={'/'}>Back</Link></button> &nbsp;
        {!createBool ? <button onClick={() => setCreateBool(true)}>Create New Source</button> : <CreateSourceComponentMono setCreateBool={setCreateBool}/>}
        {editBool ? <EditSourceComponentMono sourceObj={sourceObj} editBool={editBool} setEditBool={setEditBool}/> : null}
        
        {createBool === true || editBool === true ? null : 
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
                        

                        <button>
                            <Link to={`/sources/related-stories/${source.source_id}`}>See source-related stories</Link>
                        </button> &nbsp;

                        <button onClick={(e) => {e.preventDefault(); editSource(source)}}>Edit Source</button>
                        </details>
                    </td>
                    </tr>
                )})
                }
            </tbody>
            </table>
        </div>
        } 
    </div>
    )
};