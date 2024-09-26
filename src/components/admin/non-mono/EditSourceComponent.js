import React from "react";
import { useState } from "react";

export const EditSourceComponent = (props) => {
    const sourceObj = props.sourceObj;
    const editBool = props.editBool;
    const setEditBool = props.setEditBool;
    console.log('sourceObj', sourceObj);

    const handleNameChange = () => {

    }

    //trim name

    // if (!sourceObj) {
    //     return;
    // }

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
            <span>Only the items changed will be updated. You do not have to re-enter all forms.</span>
            <form>
            <span>If a source has more than 2 names, put all but the first in the Last Name field.</span>
            <label>Current First Name: {firstName}</label>
            <input placeholder="New first name..."></input>

            <span>If a source has more than 2 names, put all but the first in the Last Name field.</span>
            <label>Current Last Name: {lastName}</label>
            <input placeholder="New last name..."></input>

            <label>Current Occupation: {sourceOccupation}</label>
            <input placeholder="New occupation will add to Previous Occupations..."></input>

            <label>Current Age: {sourceAge}</label>
            <input placeholder="New age..." type="number"></input>

            <label>Current Phone Number: {sourcePhone}</label>
            <input placeholder="New phone number..."></input>

            <label>Current Race: {sourceRace}</label>
            <input placeholder="Select to change"></input>

            <label>Current Original Contact Date: {sourceOgContactDate}</label>
            <input placeholder="New Contact date?" type="date"></input>  

            {/* <div>{sourcePoliceBool.toString()}</div>
            <div>{sourceElectedBool.toString()}</div> */}

            <label>Most Recent Contact Date: {sourceRecentContactDate}</label>
            <input placeholder="Enter new contact date."></input>
            <button onClick={(e) => {e.preventDefault; setEditBool(false)}}>Cancel</button>
            </form>
        </div>
    )
};