import React, {useState, useEffect} from "react";
import { Story } from "./components/Story";
import { fetchFrontPage } from "./api"
import { FrontPageStory } from "./components/FrontPageStory";

export const Home = () => {

    const [frontPage, setFrontPage] = useState({});

    const fetchFrontPage = async() => {
        const fPStorys = await fetchFrontPage();
        if (fPStorys) {
            setFrontPage(fpStorys);
        }
    };


                // story_id SERIAL PRIMARY KEY,
            // story_head TEXT UNIQUE NOT NULL,
            // story_deck TEXT NOT NULL,
            // story_led TEXT NOT NULL,
            // story_text TEXT NOT NULL,
            // story_author INT NOT NULL,
            // story_tags TEXT,
    const fakeStories = [
        {
            "story_id": 1,
            "story_head": "Check out this new thing here.",
            "story_deck": "Available August 1",
            "story_led": "Beginning August 1, the new developments around the regional airport will be available for purchase.",
            "story_author": {
                "author_name": "Jamie McGill",
                "author_email": "jamie@email.com"
            },
            "story_tags": ["new", "regional", "airport", "housing"]
        },
        {
            "story_id": 2,
            "story_head": "Check out this new thing here.",
            "story_deck": "Available August 1",
            "story_led": "Beginning August 1, the new developments around the regional airport will be available for purchase.",
            "story_author": {
                "author_name": "Jamie McGill",
                "author_email": "jamie@email.com"
            },
            "story_tags": ["new", "regional", "airport", "housing"]
        },
        {
            "story_id": 3,
            "story_head": "Check out this new thing here.",
            "story_deck": "Available August 1",
            "story_led": "Beginning August 1, the new developments around the regional airport will be available for purchase.",
            "story_author": {
                "author_name": "Jamie McGill",
                "author_email": "jamie@email.com"
            },
            "story_tags": ["new", "regional", "airport", "housing"]
        },
        {
            "story_id": 4,
            "story_head": "Check out this new thing here.",
            "story_deck": "Available August 1",
            "story_led": "Beginning August 1, the new developments around the regional airport will be available for purchase.",
            "story_author": {
                "author_name": "Jamie McGill",
                "author_email": "jamie@email.com"
            },
            "story_tags": ["new", "regional", "airport", "housing"]
        },
        {
            "story_id": 5,
            "story_head": "Check out this new thing here.",
            "story_deck": "Available August 1",
            "story_led": "Beginning August 1, the new developments around the regional airport will be available for purchase.",
            "story_author": {
                "author_name": "Jamie McGill",
                "author_email": "jamie@email.com"
            },
            "story_tags": ["new", "regional", "airport", "housing"]
        },
        {
            "story_id": 6,
            "story_head": "Check out this new thing here.",
            "story_deck": "Available August 1",
            "story_led": "Beginning August 1, the new developments around the regional airport will be available for purchase.",
            "story_author": {
                "author_name": "Jamie McGill",
                "author_email": "jamie@email.com"
            },
            "story_tags": ["new", "regional", "airport", "housing"]
        },
        {
            "story_id": 7,
            "story_head": "Check out this new thing here.",
            "story_deck": "Available August 1",
            "story_led": "Beginning August 1, the new developments around the regional airport will be available for purchase.",
            "story_author": {
                "author_name": "Jamie McGill",
                "author_email": "jamie@email.com"
            },
            "story_tags": ["new", "regional", "airport", "housing"]
        },
        {
            "story_id": 8,
            "story_head": "Check out this new thing here.",
            "story_deck": "Available August 1",
            "story_led": "Beginning August 1, the new developments around the regional airport will be available for purchase.",
            "story_author": {
                "author_name": "Jamie McGill",
                "author_email": "jamie@email.com"
            },
            "story_tags": ["new", "regional", "airport", "housing"]
        },
        {
            "story_id": 9,
            "story_head": "Check out this new thing here.",
            "story_deck": "Available August 1",
            "story_led": "Beginning August 1, the new developments around the regional airport will be available for purchase.",
            "story_author": {
                "author_name": "Jamie McGill",
                "author_email": "jamie@email.com"
            },
            "story_tags": ["new", "regional", "airport", "housing"]
        }
    ];

    // useEffect(() => {
    //     fetchFrontPage();
    // }, []);

    return (
        <div className="main-content-container">
            <div>Home</div>
            <h4>Top Stories of the day:</h4>
            {fakeStories.map((story) => {
                console.log('here?', story)
                return (
                    <FrontPageStory props={story} />
                )
            })}
        </div>
    );
};