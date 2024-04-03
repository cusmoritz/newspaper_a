import React from "react";
import { useParams } from "react-router-dom";

export const SecondaryCatPage = () => {

    const {primaryCat} = useParams();
    const {secondaryCat} = useParams();

    return (
        <>
        This is a secondary catagory page for {primaryCat} / {secondaryCat}.
        </>
    )
}