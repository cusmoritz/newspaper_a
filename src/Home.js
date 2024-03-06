import React, {useState, useEffect} from "react";
import { Story } from "./components/Story";
import { fetchFrontPage } from "./api"
import { FrontPageStory } from "./components/FrontPageStory";

export const Home = () => {

    const [frontPage, setFrontPage] = useState([]);

    const loadPage = async () => {
            const fPStorys = await fetchFrontPage();
            if (fPStorys) {
                setFrontPage(fPStorys);
            }
    };

    const searchForAuthorStories = (authorId) => {
        console.log('author id', authorId);
    }

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

    useEffect(() => {
        loadPage();
    }, []);

    return (
        <div className="main-content-container">
            <div>Home</div>
            <h4>Top Stories of the day:</h4>
            {!frontPage ? null : frontPage.map((story) => {
                return (
                    <FrontPageStory props={story} key={story.story_id}/>
                )
            })}

        </div>
    );
};