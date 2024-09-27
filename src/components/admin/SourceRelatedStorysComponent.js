import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { getStorysForOneSource } from "../../api";
import { Link } from "react-router-dom";

export const SourceRelatedStorysComponent = () => {

    const {sourceId} = useParams();

    const domain = /:\/\/([^\/]+)/.exec(window.location.href)[1];

    const host = domain.split('.')[1];// we should always be in admin subdomain

    let linkBuild = `${window.location.protocol}//${host}/`;

    const [id, setId] = useState(0);
    const [storys, setStorys] = useState([]);
    const [source, setSource] = useState({});

    const fetchStorysForOneSource = async () => {
        const storysAndSource = await getStorysForOneSource(sourceId);
        if (storysAndSource) {
            console.log('both', storysAndSource)
            setStorys(storysAndSource.related);
            setSource(storysAndSource.source)
            //console.log(source)
            //console.log(storys)
        }
    }

    const loadPage = async () => {
        await fetchStorysForOneSource();    
    };

    useEffect(() => {
        loadPage();
    }, [])

    return (
        <div className="source-story-related">
            <button><Link to={'/sources'}>Back</Link></button>
        <div className="source-container">
        {!source ? null : 
            <fieldset key={source.source_id}>
                <legend>Source: </legend>
                <p>Name: {source.source_name}</p>
                <p>Location: {source.source_location}</p>
                <p>Phone number: {source.source_phone_num}</p>
                <p>Current Occupation: {source.source_occupation}</p>
                {!source.source_previous_occupation ? null :
                    source.source_previous_occupation.map((prev, index) => {
                        <p key={index}>Previous Occupations: {prev}</p>
                    })
                }
                <p>Most Recent Contact Date: {source.source_most_recent_contact_date}</p>
                <p>Original Contact Date: {source.source_original_contact_date}</p>
                {/* <p>{source.source_police_officer.toString()}</p>
                <p>{source.source_elected_official.toString()}</p> */}
                <p>Age: {source.source_age}</p>
                <p>Race: {source.source_race}</p>
                <p>Mentioned in {storys.length} stories</p>
            </fieldset>
        }
        </div>

        <table>
            <tbody>
            {!storys ? null : 
            storys.map((story, index) => {
                return (
                    <tr key={story.story_id * index }>
                        <td>
                            <details>
                                <summary>{story.story_title}</summary>
                                <h3></h3>
                                {/* we should link to the story from here but dont have categories */}
                                <p>Originally published on {story.original_publish_date}</p>
                                <p>Written by {story.author.first_name} {story.author.last_name}</p>
                            </details>

                        </td>
                    </tr>
                )
            })
        }
            </tbody>
        </table>

        </div>
    )
}

/*
<div key={story.story_id}>
<p>Title: {story.story_title}</p>
<a href={`${linkBuild}${story.story_slug}/${story.story_id}`} target="_blank"></a>
<p>Original Publish Date: {story.original_publish_date}</p>
<p>Author: {story.author.first_name} {story.author.last_name} | {story.author.public_role}</p>
{/* <p>{story.}</p>
<p>{story.}</p>

{index != storys.length - 1 ? <hr></hr> : null }
</div>
*/