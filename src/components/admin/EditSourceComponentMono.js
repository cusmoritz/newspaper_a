import React from "react";
import { useState } from "react";

export const EditSourceComponentMono = (props) => {
    const sourceObj = props.sourceObj;
    const editBool = props.editBool;
    const setEditBool = props.setEditBool;
    console.log('sourceObj', sourceObj);

    const handleNameChange = () => {

    }

    const [firstName, setFirstName] = useState("Marcus");
    const [lastName, setLastName] = useState("Moritz");
    const [sourceOccupation, setOccuaption] = useState(sourceObj.source_occupation);
    const [sourceRace, setRace] = useState(sourceObj.source_race);
    const [sourceAge, setAge] = useState(sourceObj.source_age);
    const [sourceElectedBool, setElected] = useState(sourceObj.source_elected_official);
    const [sourcePoliceBool, setOfficer] = useState(sourceObj.source_police_officer);
    const [sourcePhone, setPhoneNum] = useState(sourceObj.source_phone_num);
    const [sourceOgContactDate, setOgContactDate] = useState(sourceObj.source_original_contact_date);
    const [sourceRecentContactDate, setSourceRecentContactDate] = useState(sourceObj.sourceRecentContactDate);

    return (
        <div className="edit-source-component">
            <fieldset>
                <legend>Editing {sourceObj.source_name} </legend>
                <p>Only the fields changed will be updated. You do not have to re-enter all fields.</p>
                <p>If a source has more than 2 names, put all but the first in the Last Name field.</p>
                <label htmlFor="first-name">Current First Name: {firstName}</label>
                <input className="first-name" placeholder="New first name..."></input>
                <p></p>
                <label htmlFor="last-name">Current Last Name: {lastName}</label>
                <input className="last-name" placeholder="New last name..."></input>
                <p></p>
                <label htmlFor="occupation">Current Occupation: {sourceOccupation}</label>
                <input className="occupation" placeholder="New occupation..."></input>
                <p>Occupation note: Changing this occupation will automatically update Previous Occupation field.</p>
                <label htmlFor="age">Current Age: {sourceAge}</label>
                <input className="age" min={sourceAge} placeholder={sourceAge} type="number"></input>
                <p></p>
                <label htmlFor="phone">Current Phone Number: {sourcePhone}</label>
                <input className="phone" type="tel" placeholder={sourcePhone} pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"></input>
                <p></p>
                <label htmlFor="ethnicity">Current Race: {sourceRace}</label>
                <input className="ethnicity" placeholder="Select to change"></input>
                <p></p>
                <label htmlFor="original-date">Current Original Contact Date: {sourceOgContactDate}</label>
                <input classNAme="original-date" type="date"></input> 
                <p></p> 
                <label htmlFor="most-recent">Most Recent Contact Date: {sourceRecentContactDate}</label>
                <input className="most-recent" type="date"></input>
                <p></p>
                <button onClick={(e) => {e.preventDefault; setEditBool(false)}}>Cancel</button> &nbsp;
                <button>Submit</button>
            </fieldset>
        </div>
    )
};