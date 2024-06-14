import React from "react";
import { NavBar } from "./NavBar";
import { Link } from "react-router-dom";

export const Header = ({globalBreakingBool, globalBreakingHeadline, globalBreakingNewsPath}) => {
    //console.log(globalBreakingBool, globalBreakingHeadline, globalBreakingNewsPath)
    ///:primary/:secondary/:slug/:storyId
    return (
        <div className="header-container">
            {!globalBreakingBool ? null :
            <div id="breaking-news-banner-container">
                <h3 id="breaking-news-headline"><Link to={`/${globalBreakingNewsPath.primary}/${globalBreakingNewsPath.secondary}/${globalBreakingNewsPath.slug}/${globalBreakingNewsPath.id}`}>BREAKING NEWS: {globalBreakingHeadline.toUpperCase()}</Link></h3>
                
                
            </div>
            }
            <img src="https://placehold.jp/150x150.png" className="logo" alt="The Tooth logo"/>
            <h1>It's here</h1>
            <h2>The source.</h2>
            <div>This is the header</div>
            <hr></hr>
            <NavBar />
        </div>
    );
};

