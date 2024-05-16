import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { fetchStoriesByAuthorId } from "../api";

export const AuthorSearchResults = () => {

    const [searchResults, setSerachResults] = useState([]);
    const { id } = useParams();
    //const cleanName = name.replace('-', ' ') // this will be a problem with hyphen names

    const findStoriesByAuthorId = async (id) => {
        const results = await fetchStoriesByAuthorId(id);
        console.log('results front', results);
        if (results) {
            setSerachResults(results);
        }
    };

    const loadPage = async () => {
        findStoriesByAuthorId(id);
    }

    useEffect(() => {
        loadPage();
    }, []);

    return (
        <>
        {!searchResults[0] ? 
        null 
        : 
         <h2>Stories written by {searchResults[0].first_name} {searchResults[0].last_name}</h2>
        }

        {!searchResults ? 
        <div>There are no results for that author.</div> 
        : 
        searchResults.map((story) => {
            return (
                <>
                <fieldset className="author-bio-search-results">
                    <h3>
                        {searchResults[0].first_name} {searchResults[0].last_name} | {searchResults[0].public_role}
                    </h3>
                    <p>{searchResults[0].email}</p>
                    <p>{searchResults[0].author_blurb}</p>
                    <p>{searchResults[0].facebook_profile}</p>
                    <p>{searchResults[0].twitter_profile}</p>
                    <p>{searchResults[0].other_profile}</p>
                </fieldset>
                <fieldset key={story.story_id}>
                    <h3>{story.story_title}</h3>
                    <h4>{story.story_subhead}</h4>
                    <p>{story.story_led}</p>
                    <p>Original publication date: {story.original_publish_date.slice(0,10)}</p>
                </fieldset>
                </>
            )
        })
        }
        </>
    )
}