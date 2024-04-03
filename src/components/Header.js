import React from "react";
import { NavBar } from "./NavBar";

export const Header = () => {
    return (
        <div className="header-container">
            <img src="https://placehold.jp/150x150.png" className="logo" alt="The Tooth logo"/>
            <h1>It's here</h1>
            <h2>The source.</h2>
            <div>This is the header</div>
            <hr></hr>
            <NavBar />
        </div>
    );
};

