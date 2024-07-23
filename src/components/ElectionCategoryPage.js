import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { fetchPrimaryCatStories } from "../api";
import { useParams } from "react-router-dom";
import { Story } from "./Story";
import { FrontPageStory } from "./FrontPageStory";

export const ElectionCategoryPage = () => {
    // we gotta go get stories for the elections page

    // then what do we do with them? link together? do we create a new ability to make an election story?

    // primary cat should always be elections
    // const primary = "ELECTIONS";

    // const [stories, setStories] = useState([]);
    // const [domain, setDomain] = useState("");

    // const breadcrumbs = [];

    // const fetchPrimaryStories = async () => {
    //     const catStories = await fetchPrimaryCatStories(primary);
    //     if (catStories) {
    //         console.log('election stories?', catStories)
    //         setStories(catStories)
    //     };
    // };
    
    // const loadPage = async () => {
    //     fetchPrimaryStories();
    //     const domain = window.location.origin;
    //     setDomain(domain);
    // };

    // useEffect(() => {
    //     loadPage();
    // }, []);

    // return (
    //     <>
    //     <h1>This is the elections main page.</h1>
    //     {!stories ? null : 
    //     stories.map((story) => {
    //         console.log('story', story)
    //         return (
    //             <FrontPageStory props={story}/>
    //         )
    //     })
    //     }
    //     </>
    // )
};