import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { getStorysForOneSource } from "../../api";

export const SourceRelatedStorysComponent = () => {

    const {sourceId} = useParams();

    const [id, setId] = useState(0);
    const [storys, setStorys] = useState([]);
    const [source, setSource] = useState({});

    const fetchStorysForOneSource = async () => {
        const storysAndSource = await getStorysForOneSource(sourceId);
        if (storysAndSource) {
            console.log('both', storysAndSource)
            setStorys(storysAndSource.related);
            setSource(storysAndSource.source)
            console.log(source)
            console.log(storys)
        }
    }

    const loadPage = async () => {
        await fetchStorysForOneSource();
    };

    useEffect(() => {
        loadPage();
    }, [])

    return (
        <>
        <div className="left-column">
        {!source ? null : 
            <div key={source.source_id}>
                <p>{source.source_name}</p>
                <p>{source.source_location}</p>
                <p>{source.source_phone_num}</p>
                <p>{source.source_occupation}</p>
                {!source.source_previous_occupation ? null :
                    source.source_previous_occupation.map((prev, index) => {
                        <p key={index}>Previous Occupations: {prev}</p>
                    })
                }
                <p>{source.source_most_recent_contact_date}</p>
                <p>{source.source_original_contact_date}</p>
                {/* <p>{source.source_police_officer.toString()}</p>
                <p>{source.source_elected_official.toString()}</p> */}
                <p>{source.source_age}</p>
                <p>{source.source_race}</p>
            </div>
        }
        </div>
        <div className="right-column">
        {!storys ? null : 
            storys.map((story) => {
                console.log('stroy', story)
                return (
                <div key={story.story_id}>
                    <p>{story.story_title}</p>
                    <p>{story.original_publish_date}</p>
                    <p>{story.story_author}</p>
                    {/* <p>{story.}</p>
                    <p>{story.}</p> */}
                </div>
                )
            })
        }
        </div>
        </>
    )
}