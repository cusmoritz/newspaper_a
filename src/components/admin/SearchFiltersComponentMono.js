import React from "react";
import { useState } from "react";
import { searchStoriesByDate } from "../../api";
import { searchStoriesByDateRange } from "../../api";

export const SearchFilterComponentMono = ({stories, setStories, setSearchDisplayQuery}) => {

    const [searchDate, setSearchDate] = useState("");
    const [rangeDateStart, setRangeDateStart] = useState("");
    const [rangeDateEnd, setRangeDateEnd] = useState("");

    const clearFilters = () => {
        setStories([]);
        setSearchDisplayQuery("");
        setSearchDate("");
        setRangeDateStart("");
        setRangeDateEnd("");
    }

    const searchByDate = async () => {
        console.log('date', searchDate)
        setSearchDisplayQuery(searchDate);
        let returnStories = await searchStoriesByDate(searchDate);
        if (returnStories){
            console.log('stories', returnStories);
            setStories(returnStories);
        }
    };

    const searchByDateRange = async () => {
        console.log('ping')
        if (rangeDateEnd.length < 1 || rangeDateStart.length < 1) {
            return false;
        }

        setSearchDisplayQuery(`${rangeDateStart}-${rangeDateEnd}`);
        console.log(rangeDateStart, rangeDateEnd)
        let returnStories = await searchStoriesByDateRange(rangeDateStart, rangeDateEnd);
        if (returnStories) {
            console.log('stories', returnStories);
            setStories(returnStories);
        }
    };

    return (
        <div>
        <button onClick={() => clearFilters()}>Clear filters</button>
        <p></p>
        <label htmlFor="date-search">Search stories by date published:</label>
        <input className="date-search" type="date" onChange={(e) => setSearchDate(e.target.value)}/> &nbsp;
        <button onClick={() => searchByDate()}>Search</button>
        <p></p>
        <label htmlFor="include-date">Include date in keyword search:</label>
        <input className="include-date" type="checkbox" />

        <p></p>
        <p>Search by date range:</p>
        <p></p>
        <label htmlFor="start-range-search">Start Date:</label>
        <input className="start-range-search" type="date" value={rangeDateStart} onChange={(e) => setRangeDateStart(e.target.value)} /> &nbsp;
        <p></p>
        <label htmlFor="end-range-search">End date:</label>
        <input className="end-range-search" type="date" value={rangeDateEnd} onChange={(e) => setRangeDateEnd(e.target.value)} />
        <p>asdf</p>
        <button onClick={() => searchByDateRange()}>Search</button>
        <p>asdf</p>
        <label htmlFor="include-date-range">Include date range in keyword search:</label>
        <input className="include-date-range" type="checkbox" />
        <p></p>
        <label htmlFor="author-search">Search by author:</label>
        <select>
            <option value={""}>Select an option</option>
            {/* import all the authors here */}
        </select> &nbsp;
        <button>Search</button>
        <p></p>
        <label htmlFor="headline-search">Headline keyword search</label>
        <input className="headline-search" type="text" /> &nbsp;
        <button>Search</button>
        <p>Note: Headline keyword search can take up to a minute or more.</p>
        <p></p>
        <label htmlFor="body-text-search">Body text search</label>
        <input className="body-text-search" type="text" /> &nbsp;
        <button>Search</button>
        <p>Note: Body text search can take several minutes. To make it faster, include a date range.</p>
        <p></p>
        </div>
    )
}