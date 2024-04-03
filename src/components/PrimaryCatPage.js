import React from "react";
import { useParams } from "react-router-dom";

export const PrimaryCatPage = () => {

    const {primaryCat} = useParams();
    console.log(primaryCat)
    return (
        <>
        This is the primary catagory page for {primaryCat}.
        </>
    )
}