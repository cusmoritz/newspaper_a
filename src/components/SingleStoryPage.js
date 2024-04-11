import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchSinglePageStory } from "../api";

export const SingleStoryPage = () => {

    const {primary, secondary, slug, storyId} = useParams();

    // /:primary/:secondary/:slug/:storyId

    const fetchStory = async () => {
        if (!storyId || !slug || !primary || !secondary) {
            return false;
        } else {
            await fetchSinglePageStory(storyId);
        }
    }

    // slug is the story slug, but call is to database from storyId?
    // do we want /story/::storyId::/::storySlug?
    // I think we want /primaryCat/seconddaryCat/slug-slug-slug/storyId
    // we should also consider catagories (news , opinion, etc)

    // go and get the story from the story ID
    // return .com/:primary/:secondary/:slug/:storyId
    // profit?

    const loadPage = async () => {
        await fetchStory();
    };

    useEffect(() => {
        loadPage()
    }, []);

    return (
        <>
        
        </>
    )
};