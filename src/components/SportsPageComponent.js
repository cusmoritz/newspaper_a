import React, { useState } from "react";
import { useEffect } from "react";
import { fetchPrimaryCatStories } from "../api";

export const SportsPageComponent = () => {

    const loadPage = async () => {
        const stories = await fetchPrimaryCatStories(5);
        console.log('stories', stories)
    };

    useEffect(() => {
        loadPage();
    }, [])

    return (
        <>
        This is the sports page component.
        </>
    )
};