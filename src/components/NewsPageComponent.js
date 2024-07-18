import React, { useState } from "react";
import { useEffect } from "react";
import { fetchPrimaryCatStories } from "../api";

export const NewsPageComponent = () => {

    const loadPage = async () => {
        const stories = await fetchPrimaryCatStories(1);
        console.log('stories', stories)
    };

    useEffect(() => {
        loadPage();
    }, [])

    return (
        <>
        This is the news page component.
        </>
    )
};