import React from 'react';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { fetchStoriesWithTag } from '../api';

export const TagSearchResults = () => {

    const { tag } = useParams(); // param comes out clean?
    const cleanTag = tag.replace('%20', ' ');
    const [searchResults, setSearchResults] = useState([]);

    const findStoriesWithTag = async (tag) => {
        const results = await fetchStoriesWithTag(tag);
        if (results) {
            console.log('results front', results);
            setSearchResults(results);
        }
    };

    return (
        <div className="search-results-container">
            <h2>Stories with the tag #{tag}:</h2>
            {!searchResults ? 
            null 
            :   
            searchResults.map((story) => {
                return (
                <div className="individual-search-story">
                        <fieldset key={story.story_id}>

                        </fieldset>
                </div>
                )
            })
            }
        <button onClick={() => findStoriesWithTag(cleanTag)}>FIND EM</button>
        {!searchResults ? null : <>There were search results.</>}
        </div>
    )
};