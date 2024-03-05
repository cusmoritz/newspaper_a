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
            setSearchResults(results);
        }
    };

    const loadPage = async () => {
        await findStoriesWithTag(tag);
    }

    useState(() => {
        loadPage();
    })

    return (
        <div className="search-results-container">
            <h2>Stories with the tag #{tag}:</h2>
            {!searchResults ? 
            <div>There are no stories with that tag.</div> 
            :   
            searchResults.map((story) => {
                return (
                <div key={story.story_id} className="individual-search-story">
                        <fieldset>
                            <h2>{story.story_title}</h2>
                            <h3>{story.story_subhead}</h3>
                            <p>{story.story_led}</p>
                            <p>Original publish date: {story.original_publish_date.slice(0,10)}</p>
                        </fieldset>
                </div>
                )
            })
            }
        <button onClick={() => findStoriesWithTag(cleanTag)}>FIND EM</button>
        </div>
    )
};