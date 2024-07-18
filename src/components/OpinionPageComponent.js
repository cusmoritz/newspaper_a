import React, { useState } from "react";
import { useEffect } from "react";
import { fetchPrimaryCatStories } from "../api";

export const OpinionPageComponent = () => {

    const loadPage = async () => {
        const stories = await fetchPrimaryCatStories(2);
        console.log('stories', stories)
    };

    useEffect(() => {
        loadPage();
    }, [])

    return (
        <>
        This is the opinion page component.
        </>
    )
};