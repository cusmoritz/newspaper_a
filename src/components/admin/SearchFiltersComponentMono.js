import React from "react";
import { useState } from "react";
import { searchStoriesByDate } from "../../api";

export const SearchFilterComponentMono = () => {

    const [stories, setStories] = useState([]);
    const [searchDate, setSearchDate] = useState(new Date());


    const searchByDate = async () => {
        console.log('date', searchDate)
        let returnStories = await searchStoriesByDate(searchDate);
        if (returnStories){
            console.log('stories', returnStories);
            setStories(returnStories);
        }
    }
    return (
        <div>
        Search filters component.
        <p></p>
        <label htmlFor="date-search">Search stories by date published:</label>
        <input className="date-search" type="date" onChange={(e) => setSearchDate(e.target.value)}/> &nbsp;
        <button onClick={() => searchByDate()}>Search</button>
        <p></p>
        <label htmlFor="include-date">Include date in keyword search:</label>
        <input className="include-date" type="checkbox" />
        <p></p>
        <label htmlFor="include-date-range">Include date range in keyword search:</label>
        <input className="include-date-range" type="checkbox" />
        <p></p>
        <label htmlFor="range-search">Search by date range:</label>
        <input className="range-search" type="date" /> &nbsp;
        <input className="range-search" type="date" /> &nbsp;
        <button>Search</button>
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
        <input className="body-text-search" type="text" />
        <p>Note: Body text search can take several minutes. To make it faster, include a date range.</p>
        <p></p>
        </div>
    )
}