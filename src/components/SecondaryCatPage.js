import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { fetchSecondaryCatStories } from "../api"

export const SecondaryCatPage = () => {

    const {primaryCat} = useParams();
    const {secondaryCat} = useParams();
    const primary = primaryCat.toUpperCase();
    const secondary = secondaryCat.toUpperCase();

    const [stories, setStories] = useState([]);

    const fetchPrimarySecondary = async () => {
        const secondaryStories = await fetchSecondaryCatStories(primary, secondary);
        if (secondaryStories) {
            setStories(secondaryStories);
        }
    }

    const loadPage = () => {
        // fetch stories for primary/secondary
        fetchPrimarySecondary();
    }

    useEffect(() => {
        loadPage();
    }, [primary, secondary]);

    return (
        <div className="secondary-catagory-page--container">
            <h3 className="primary-catagory-header">{secondary}</h3>
        This is a secondary catagory page for {primary} / {secondary}.
        </div>
    )
}