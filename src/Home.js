import React, {useState, useEffect} from "react";
import { Story } from "./components/Story";
import { fetchFrontPage } from "./api"
import { FrontPageStory } from "./components/FrontPageStory";
import { fetchFrontPageCatsSubcats } from "./api";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Link } from "react-router-dom";

export const Home = () => {

    const [frontPage, setFrontPage] = useState([]);
    const [catagories, setCatagories] = useState({});

    const loadPage = async () => {
            const fPStorys = await fetchFrontPage();
            if (fPStorys) {
                //console.log('FP', fPStorys)
                // fPStorys.map((story) => {
                //     if (story.breaking_news_flag === true && 
                //         story.breaking_news_banner_headline != null) {
                //             setGlobalBreakingBool(true);
                //             setGlobalBreakingHeadline(story.breaking_news_banner_headline);
                //             setGlobalBreakingNewsPath({primary: story.primary_cat, secondary: story.secondary_cat, slug: story.story_slug, id: story.story_id})
                //             // primary_cat secondary_cat story_slug story_id
                //     }
                // })
                // need a better solution for breaking news
                setFrontPage(fPStorys);
            }
            // const allCatagories = await fetchFrontPageCatsSubcats();
            // if (allCatagories) {
            //     setCatagories(allCatagories);
            // }
    };

    // const searchForAuthorStories = (authorId) => {
    //     console.log('author id', authorId);
    // }

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

            <h4>Top Story of the day:</h4>
            {!frontPage ? null : frontPage.map((story) => {
                return (
                    <div key={story.story_id}>
                    <FrontPageStory props={story} />
                    </div>
                )
            })}
            <Link to={"/news/page/2"}><button>Next Page</button></Link>
        </div>
    );
};

// export const Modal = (inputText) => {

//     return (
//         <div id="modal-container">
//             <button className="modal-close">X</button>
//             <div className="modal-text-container">
//                 {inputText}
//             </div>
//         </div>
//     )
// };