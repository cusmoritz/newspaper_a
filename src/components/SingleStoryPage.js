import React from "react";
import { useParams } from "react-router-dom";

const SingleStoryPage = () => {

    const storyId = useParams();

    // slug is the story slug, but call is to database from storyId?
    // do we want /story/::storyId::/::storySlug?
    // we should also consider catagories (news , opinion, etc)

    return (
        <>
        
        </>
    )
};