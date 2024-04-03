import React from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

export const PrimaryCatPage = () => {

    const {primaryCat} = useParams();
    const primary = primaryCat.toUpperCase();

    const [stories, setStories] = useState([]);

    const fetchPrimaryStories = async () => {
        console.log('fetching ... ')
    };
    
    const loadPage = async () => {
        const mainCatStories = await fetchPrimaryStories();
        if (mainCatStories) {
            setStories(mainCatStories);
        };
    };

    useEffect(() => {
        // loadPage();
    }, []);
    return (
        <div className="primary-catagory-page-container">
            <h3 className="primary-catagory-header">{primary}</h3>
        </div>
    )
}