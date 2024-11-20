import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { addPageView, fetchSinglePageStory } from "../api";
import { useState } from "react";
import { Link } from "react-router-dom";

export const SingleStoryPageMono = () => {

    // /:primary/:secondary/:slug/:storyId
    const {secondary, slug, storyId} = useParams(); // primary is handled in App.js

    const [story, setStory] = useState({});
    const [pageView, setPageView] = useState(0);
    const [breadcrumbs, setBreadcrumbs] = useState({});
    const [sources, setSources] = useState([]);
    

    const updatePageViewsOnLoad = async (id) => {
        await addPageView(id);
        return;
    }

    // const parseFootnoteWords = (storyObj) => {
    //     let storyText = storyObj.story_text;
    //     console.log('story obj', storyText)
    //     storyObj.footnote_words.forEach((para) => { // words and paragraph obj
    //         console.log('each obj', para) // words will look like "['word here']"
    //         // clean up the word
    //         para.word.forEach((thing) => {
    //             const recursion = "";
    //             console.log('thing here', thing)
    //             //let wordTrim = thing.trim();
    //             let wordReplace = thing.replace(/[\[\]']+/g,'').trim(); // remove square brackets and single quotes
    //             console.log('word', wordReplace)
    //             // match the word to the paragraph placement in footnoteObj
    //             console.log(storyText[para.paragraph])
    //             let newPara = storyText[para.paragraph].replace(thing, wordReplace);
    //             console.log('new parap', newPara)

    //             // do we allow footnotes in the first paragraph? (ie Led); will have to account for that.

    //             //storyText[para] = newPara;
    //             //console.log('story text changed', storyText[para])
    //         })
    //     })
    // }

    const parseFootnotesRecursive = (storyTextPara, footnoteArr) => { // i can just send the paragraph text, not the whole array
        //console.log('we trying', storyTextPara, footnoteArr)
        if (footnoteArr.length <= 0) {
            return;
        }
        let newParagraph = "";
        for (let i = 0; i < footnoteArr.length; i++) {
            let word = footnoteArr[i].word[i]
            console.log(footnoteArr[i].word[i])
            let wordReplace = word.replace(/[\[\]']+/g,'').trim(); // remove square brackets and single quotes
            // match the word to the paragraph placement in footnoteObj
            let editedParagraph = storyTextPara.replace(word, wordReplace);
            newParagraph = editedParagraph;
            console.log('new paragraph', newParagraph)
            parseFootnotesRecursive(newParagraph, footnoteArr[i++].word)
        }
        return newParagraph;
    }

    // working with a string as StoryObj and an array of words
    // const parseFoonotesRecursive = (storyTextPara, footnoteArr) => { // i can just send the paragraph text, not the whole array
    //     console.log('1', storyTextPara, footnoteArr)
    //     let length = footnoteArr.length;
    //         if (length < 0) {
    //             return;
    //         }
            
    //         let newParagraph = "";
    //         //for (let i = 0; i < footnoteArr.length; i++) {
    //             let word = footnoteArr[0];
    //             console.log('2', word)
    //             let regex = (/[\[\]']+/g);
    //             let wordReplace = word.replace(/[\[\]']+/g,'').trim(); // remove square brackets and single quotes
    //             // match the word to the paragraph placement in footnoteObj
    //             let editedParagraph = storyTextPara.replace(word, wordReplace);
    //             newParagraph = editedParagraph;
    //             footnoteArr.shift();
    //             parseFoonotesRecursive(newParagraph, footnoteArr)
    //         //}
    //         return newParagraph;
    //     }

    // const parseText = (storyText) => {
    //     console.log(storyText.length);
    //     // find urls hidden in the text.
    //     //let what = storyText.match("[");
    //     var regex = /^[]/;
    //     const begin = new RegExp(/\[\[/);
    //     const end = new RegExp(/\]\]/);

    //     console.log(begin, end)
    //     let index1 = storyText.match(begin).index;
    //     let index2 = storyText.match(end).index;
    //     console.log(index1, index2)
    //     let string = storyText.slice(index1, index2);
    //     console.log(string)
    // } we need to move this to the backend and parse it there before we save it

    const fetchStory = async () => {
        console.log(storyId, slug, secondary)
        if (!storyId || !slug || !secondary) {
            return false;
        } else {
            const req = await fetchSinglePageStory(storyId);
            if (req){

                console.log('story 1 mono', req.sources.length)
                setBreadcrumbs(req.category);
                setPageView(req.page_views)
                updatePageViewsOnLoad(req.story_id);
                setSources(req.sources)
                //parseFootnoteWords(req);
                setStory(req);
                // for (let i = 0; i < req.story_text.length; i++) {
                //     parseFootnotesRecursive(req.story_text[i], req.footnote_words);
                // }
                
            }
        }
        return;
    }

    var details = [...document.querySelectorAll('details')];

    document.addEventListener('click', function(e) {
        if (!details.some(f => f.contains(e.target))) {
            details.forEach(f => f.removeAttribute('open'));
        } else {
            details.forEach(f => !f.contains(e.target) ? f.removeAttribute('open') : '');
        }
    })

// primary/secondary/story-slug-goes-here

    const loadPage = () => {
        fetchStory();
        return;
    };

    useEffect(() => {
        loadPage()
    }, [secondary, slug, storyId]);

    return (
        <>
        {!story.category ? null : 
            <div>
                <p className="breadcrumb-1"><Link to={`/${story.category.primary.primary_catagory_name}`}>{story.category.primary.primary_catagory_name}</Link></p>
                <p className="breadcrumb-2"><Link to={`/${story.category.primary.primary_catagory_name}/${story.category.secondary.secondary_catagory_name}`}>{story.category.secondary.secondary_catagory_name}</Link></p>
            </div>
        }
        <h3>{story.story_title}</h3>
        <h4>{story.story_subhead}</h4>
        {!story.image_flag ? null : <img />}
        <fieldset>
            <p value={story.author_id}>By <Link to={`/search/author/${story.author_id}`}>{story.first_name} {story.last_name}</Link> | {story.public_role}</p>
            <p>{story.email}</p>
        </fieldset>
        {/* <p className="public-date">Published {story.original_publish_date.slice(0, 10)}</p> */}
        <p>{story.story_led}</p>

        {!story.story_text ? null : story.story_text.map((paragraph, index) => {
            if (paragraph.includes("sup")) {
                return ( <p key={index} dangerouslySetInnerHTML={{__html: paragraph}}></p> ) // ??
            } else {
                return (<p key={index}>{paragraph}</p>)
            }
        })}

        {!story.footnote_urls ? null : 
        <table>
            <tbody>
                <tr>
                    <td>
                    <details>
                    <summary>Footnotes:</summary>
                    {story.footnote_urls.map((footnote, index) => {
                    return (
                            <div key={index}>
                                <p id={`footnote-${index}`}>{index + 1}: <a href={footnote} target="_blank">{footnote}</a></p>
                            </div>
                        )
                    })}
                    </details>
                    </td>
                </tr>
            </tbody>
        </table>

        }

        {!sources.length ? null :
        <table>
            <tbody>
                <tr>
                    <td>
                    <details>
                    <summary>Sources:</summary>
                    {sources.map((source, index) => {
                        return (
                            // TODO: Add link to search stories by source
                            <div key={source.source_id}>
                                <p>{source.source_name}</p>
                                <p>{source.source_occupation}</p>
                                <p>{source.source_location}</p>
                                {source.index == sources[-1] ? null : <hr></hr>}
                            </div>
                        )
                    })}
                    </details>
                    </td>
                </tr>
            </tbody>
        </table>
        }
        {!story.tags ? null :      
        <table>
            <tbody>
                <tr>
                    <td>
                    <details>
                    <summary>Tags: &nbsp;</summary> 
                    {story.tags.map((tag) => {
                        return (
                            <Link to={`/search/tag/${tag.tag}`} key={tag.tag}>#{tag.tag}</Link>
                        )
                    })}
                    </details>
                    </td>
                </tr>
            </tbody>
        </table>   

        }
        <table>
            <tbody>
                <tr>
                    <td>
                    <details>
                    <summary>By: <Link to={`/search/author/${story.author_id}`}>{story.first_name} {story.last_name}</Link></summary>
                    {/* <p value={story.author_id}><Link to={`/search/author/${story.author_id}`}>{story.first_name} {story.last_name}</Link> |  */}
                    <p>{story.public_role} | {story.email}</p>
                    <p>{story.author_blurb}</p>
                    <p>You can learn more at {story.twitter_profile}, {story.facebook_profile}, {story.other_profile}</p>
                    </details>
                    </td>
                </tr>
            </tbody>
        </table>

        <div>
            <p>This story has been viewed {pageView} time{pageView > 1 ? "s" : null}</p>
        </div>
        </>
    )
};