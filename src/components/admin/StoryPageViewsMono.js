import React from "react";
import { useState } from "react";
import { getPageViewsForOneStoryOneDay } from "../../api";

export const StoryPageViewsMono = () => {

    const [storyId, setStoryId] = useState(0);
    const [searchDate, setSearchDate] = useState("");
    const [searchResultsBool, setSerachResultsBool] = useState(false);
    const [pageViews, setPageViews] = useState({});
    const [pageViewResultsDate, setPageViewsResultDate] = useState("");
    const [viewHours, setViewHours] = useState([]);
    const [maxHeight, setMaxHeight] = useState(0);
    const [totalViews, setTotalViews] = useState(0);

    const mouseEnterBar = (views, hour, height) => { //
        // console.log(`${views} views in the ${hour}th hour, ${height}`)
        // var element = document.getElementById(`${views + hour}`);
        // //console.log('element',element)
        // var child = document.createElement("div");
        // child.innerHTML = `${views} in the ${hour}th hour`;
        // let hoverAtt = document.createAttribute("style");
        // let position = document.createAttribute("position");
        // let display = document.createAttribute("display")
        // position.value = "relative";
        // display.value = "inline-block";
        // hoverAtt.value = "height:25px; width:25px; border:5px solid red;";
        // child.setAttributeNode(position)
        // child.setAttributeNode(display)
        // child.setAttributeNode(hoverAtt);
        // element.appendChild(child)
        // console.log(child);
        // element.appendChild(child)

    }

    const searchForPageViews = async () => {
        const date = new Date(2024, 11, 7);
        const allViewsObj = await getPageViewsForOneStoryOneDay(storyId, date);
        console.log('these are my views', allViewsObj)
        if (allViewsObj) {
            console.log('pageviews FE ', allViewsObj.hours);

            setPageViewsResultDate(`${allViewsObj.story_view_year}/${allViewsObj.story_view_month}/${allViewsObj.story_view_day}`);
            setPageViews(allViewsObj);
            setViewHours(allViewsObj.hours);

            let max = 0;
            let total = 0;

            for (let i = 0; i < allViewsObj.hours.length; i++) {
                total += allViewsObj.hours[i];

                if (allViewsObj.hours[i] > max) {
                    max = allViewsObj.hours[i];
                }
            }
            console.log('max)', max)
            setTotalViews(total);
            setMaxHeight(max);
        
            return;
        } else {
            return false;
        }
    };

    return (
        <>
        <h2>Page Views</h2>
        {!searchResultsBool ?
        <>
            <label htmlFor="story-id-select">Input a story ID to see page view statistics:</label>
            <input className="story-id-select" type="number" onChange={(e) => setStoryId(e.target.value)}/>
            &nbsp;
            <button onClick={searchForPageViews}>Search</button>
        </>
        :
        null
        }
        <div className="page-views-admin-container">
            {!viewHours.length ? null :
            <div>
                <p>Page views for story id {pageViews.story_id} on {pageViewResultsDate}. Hover over bars to see page views.</p>
                <p style={{transform: "rotate(-90deg)", position: "absolute", left: "-40px"}}>Views -></p>
                <svg height={maxHeight*10} width="100%">
                <line x1="0" y1="0" x2="0" y2="400" style={{stroke: "white", width: 3 }}/>
                {viewHours.map((hour, index) => {
                    return (
                        <rect key={(index+hour)*index} id={index+hour} height={hour*10} width="25"
                            x={index*30+10} y={(maxHeight*10)-(hour*10)-10} fill="blue"
                            onMouseEnter={() => mouseEnterBar(hour, index, hour*10)}>
                                <title>{hour} views at {(index.toString().length < 2) ? `0${index}` : index}00 </title>
                        </rect>
                    )
                })}
                <line x1="0" y1={maxHeight*10} x2="1000" y2={maxHeight*10} style={{stroke: "white", width: 3}}/>

                </svg>
                <p>Hours -></p>
                <p>Total views for {pageViewResultsDate}: {totalViews}</p>
            </div>
            }
        </div>
        </>
    );
};