import React from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { fetchPrimaryCatStories } from "../api";

export const PrimaryCatPage = () => {

    const {primaryCat} = useParams();
    const primary = primaryCat.toUpperCase();
    console.log(primaryCat)
    const [stories, setStories] = useState([]);

    const breadcrumbs = [];

    const fetchPrimaryStories = async () => {
        console.log('fetching ... ')
        const catStories = await fetchPrimaryCatStories(primary);
        if (catStories) {
            setStories(catStories)
        }
    };
    
    const loadPage = async () => {
        await fetchPrimaryStories();
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