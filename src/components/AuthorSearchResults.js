import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { fetchOneAuthorById, fetchStoriesByAuthorId } from "../api";
import { StoryPreviewComponent } from "./StoryPreviewComponent";

export const AuthorSearchResults = () => {

    const [searchResults, setSearchResults] = useState([]);
    const [author, setAuthor] = useState({});
    const { id } = useParams();
    //const cleanName = name.replace('-', ' ') // this will be a problem with hyphen names

    // const findAuthorById = async (id) => {
    //     const author = await fetchOneAuthorById(id);
    //     if (author) {
    //         console.log('author', author)
    //         setAuthor(author);
    //     }
    // };

    const findStoriesByAuthorId = async (id) => {
        const results = await fetchStoriesByAuthorId(id);
        //console.log('results front', results);
        if (results) {
            setSearchResults(results);
            setAuthor({author_blurb: results[0].author_blurb, author_id: results[0].author_id, email: results[0].email, facebook_profile: results[0].facebook_profile, first_name: results[0].first_name, internal_role: results[0].internal_role, last_name: results[0].last_name, other_profile: results[0].other_profile, public_role: results[0].public_role, twitter_profile: results[0].twitter_profile})
        }
    };

    const loadPage = async () => {
        await findStoriesByAuthorId(id);
        //await findAuthorById(id)
    }

    useEffect(() => {
        loadPage();
    }, [id]);

    return (
        <>
        {!searchResults[0] ? 
        null 
        : 
        <h2>Stories written by {searchResults[0].first_name} {searchResults[0].last_name}</h2>
        }

        {!searchResults[0] ? null : 
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
        }

        {!searchResults ? 
        <div>There are no results for that author.</div> 
        : 
        searchResults.map((story) => {
            //console.log('story', story)
            let fixPrimary = story.category.primary.name.replace(" ", "-").toLowerCase();
            let fixSecondary = story.category.secondary.name.replace(" ", "-").toLowerCase();
            return (
                <StoryPreviewComponent storyObj={story} primaryCat={fixPrimary} subCat={fixSecondary} authorSearchFlag={true}/>
            )
        })
        }
        </>
    )
}