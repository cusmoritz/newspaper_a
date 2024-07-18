import React, { useState } from "react";
import { useEffect } from "react";
import { fetchPrimaryCatStories } from "../api";

export const EntertainmentPageComponent = () => {

    const loadPage = async () => {
        const stories = await fetchPrimaryCatStories(6);
        console.log('stories', stories)
    };

    useEffect(() => {
        loadPage();
    }, [])

    return (
        <>
        This is the entertainment page component.
        </>
    )
};