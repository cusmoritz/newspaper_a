import React, { useState } from "react";
import { useEffect } from "react";
import { fetchPrimaryCatStories } from "../api";

export const OutdoorsPageComponent = () => {

    const loadPage = async () => {
        const stories = await fetchPrimaryCatStories(4);
        console.log('stories', stories)
    };

    useEffect(() => {
        loadPage();
    }, [])

    return (
        <>
        This is the outdoors page component.
        </>
    )
};