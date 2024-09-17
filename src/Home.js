import React, {useState, useEffect} from "react";
import { Story } from "./components/Story";
import { fetchTenMostRecent } from "./api"
import { FrontPageStory } from "./components/FrontPageStory";
import { fetchFrontPageCatsSubcats } from "./api";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

export const Home = () => {

    const [frontPage, setFrontPage] = useState([]);
    const [catagories, setCatagories] = useState({});

    let {pageNo} = useParams();
    console.log('page np front end', pageNo)
    if (pageNo == undefined || pageNo == null) {
        pageNo = 0;
    }

    var details = [...document.querySelectorAll('details')];
    // var detailChildren = [];
    // console.log('details', details)
    // if (details.length) {
    //     for (let detail of details) {
    //         console.log('detail', detail.children);
    //         if (detail.children) {
    //             for (let domElement of detail.children) {
    //                 console.log('dom element', domElement)
    //                 detailChildren.push(domElement);
    //             }
    //         }
    //     }
    // }

    document.addEventListener('click', function(e) {
        if (!details.some(f => f.contains(e.target))) {
            details.forEach(f => f.removeAttribute('open'));
        } else {
            details.forEach(f => !f.contains(e.target) ? f.removeAttribute('open') : '');
        }
    })

    const loadPage = async () => {
            const fPStorys = await fetchTenMostRecent(pageNo);
            if (fPStorys) {
                setFrontPage(fPStorys);
            }
    };

    useEffect(() => {
        loadPage();
    }, [pageNo]);

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
            <Link to={`/page/${Number(pageNo) + 1}`}><button>Next Page</button></Link>
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