import React from "react";
import { NavBar } from "./NavBar";
import { NavBarMono } from "./NavBarMono";
import { Link } from "react-router-dom";

export const Header = ({subdomain}) => {
    //console.log(globalBreakingBool, globalBreakingHeadline, globalBreakingNewsPath)
    ///:primary/:secondary/:slug/:storyId
    return (

        <div className="header-container">
            {/* {!globalBreakingBool ? null :
            <div id="breaking-news-banner-container">
                <h3 id="breaking-news-headline"><Link to={`/${globalBreakingNewsPath.primary}/${globalBreakingNewsPath.secondary}/${globalBreakingNewsPath.slug}/${globalBreakingNewsPath.id}`}>BREAKING NEWS: {globalBreakingHeadline.toUpperCase()}</Link></h3>
                
                
            </div>
            } */}
            {/* <img src="https://placehold.jp/150x150.png" className="logo" alt="The Tooth logo"/> */}
            <table className="header">
                <tbody>
                    <tr>
                        <td colSpan="2" rowSpan="2">
                            {/* <img src="https://placehold.jp/50x50.png" className="logo" alt="The Tooth logo"/> */}
                            <h1 className="title"><a href="/">The Tooth News</a></h1>
                            <span className="subtitle">Your source for news about the Teeth</span>
                        </td>
                        <th>Version</th>
                        <td className="width-min">v0.0.0</td>
                    </tr>
                    <tr>
                        <th>Updated:</th>
                        <td className="width-min">
                            <time>2024-12-11</time>
                        </td>
                    </tr>
                    <tr>
                        <th className="width-min">Author</th>
                        <td className="width-auto">
                            <a href="www.google.com">
                                <cite>Marcus Moritz</cite>
                            </a>
                        </td>
                        <td className="width-min" >License</td>
                        <td>Not yet</td>
                    </tr>
                </tbody>
            </table>
            {/* <h1>It's here</h1>
            <h2>The source.</h2>
            <div>This is the header</div> */}
            <hr></hr>
            {subdomain === "admin" ?
            null
            : 
            <NavBarMono />
            }
        </div>
    );
};

