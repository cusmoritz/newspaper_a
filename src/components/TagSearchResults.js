import React from 'react';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { fetchStoriesWithTag } from '../api';
import { StoryPreviewComponent } from './StoryPreviewComponent';

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
                console.log('tag story', story)
                let fixPrimary = story.category.primary.name.replace(" ", "-").toLowerCase();
                let fixSecondary = story.category.secondary.name.replace(" ", "-").toLowerCase();
                return (
                    <>
                    <StoryPreviewComponent storyObj={story} primaryCat={fixPrimary} subCat={fixSecondary}/>
                    </>
                )
            })
            }
        <button onClick={() => findStoriesWithTag(cleanTag)}>FIND EM</button>
        </div>
    )
};