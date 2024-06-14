import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { addPageView, fetchSinglePageStory } from "../api";
import { useState } from "react";
import { Link } from "react-router-dom";

export const SingleStoryPage = () => {

    const {primary, secondary, slug, storyId} = useParams();

    const [story, setStory] = useState([]);
    const [breadcrumbs, setBreadcrumbs] = useState({});

    // /:primary/:secondary/:slug/:storyId

    const updatePageViewsOnLoad = async () => {
        let pageViews = 0;
        if (story) {
            //console.log('story here', story)
            pageViews = await addPageView(story.story_id);
        }
        return pageViews;
    }

    const parseText = (storyText) => {
        console.log(storyText.length);
        // find urls hidden in the text.
        //let what = storyText.match("[");
        var regex = /^[]/;
        const begin = new RegExp(/\[\[/);
        const end = new RegExp(/\]\]/);

        console.log(begin, end)
        let index1 = storyText.match(begin).index;
        let index2 = storyText.match(end).index;
        console.log(index1, index2)
        let string = storyText.slice(index1, index2);
        console.log(string)
    }

    const fetchStory = async () => {
        if (!storyId || !slug || !primary || !secondary) {
            return false;
        } else {
            const req = await fetchSinglePageStory(storyId);
            if (req){
                //console.log('story', req.story_text)
                setStory(req);
                setBreadcrumbs(req.category);
                parseText(req.story_text)
            }
        }
    }

    // slug is the story slug, but call is to database from storyId?
    // do we want /story/::storyId::/::storySlug?
    // I think we want /primaryCat/seconddaryCat/slug-slug-slug/storyId
    // we should also consider catagories (news , opinion, etc)

    // go and get the story from the story ID
    // return .com/:primary/:secondary/:slug/:storyId
    // profit?

    const loadPage = async () => {
        const whatSNext = await fetchStory();
        //console.log(breadcrumbs)
        if (whatSNext){
            await updatePageViewsOnLoad();
        }
    };

    useEffect(() => {
        loadPage()
    }, [primary, secondary, slug, storyId]);

    return (
        <>
        {!story.category ? null : 
            <div className="breadcrumb-container">
                <p className="breadcrumb-1"><Link to={`/${story.category.primary.primary_catagory_name}`}>{story.category.primary.primary_catagory_name}</Link></p>
                <p className="breadcrumb-2"><Link to={`/${story.category.primary.primary_catagory_name}/${story.category.secondary.secondary_catagory_name}`}>{story.category.secondary.secondary_catagory_name}</Link></p>
            </div>
        }
        <h3 className="title">{story.story_title}</h3>
        <h4 className="subhead">{story.story_subhead}</h4>
        {!story.image_flag ? null : <img />}
        <fieldset className="author-box">
            <p value={story.author_id}>By <Link to={`/search/author/${story.author_id}`}>{story.first_name} {story.last_name}</Link> | {story.public_role}</p>
            <p>{story.email}</p>
        </fieldset>
        {/* <p className="public-date">Published {story.original_publish_date.slice(0, 10)}</p> */}
        <p className="story-led">{story.story_led}</p>
        <p className="story-text">{story.story_text}</p>
        {!story.tags ? null :         
        <fieldset className="story-tag-container">
                    <p>Tags: &nbsp;</p> 
                    {story.tags.map((tag) => {
                        return (
                            <Link to={`/search/tag/${tag.tag}`} key={tag.tag}>#{tag.tag}</Link>
                        )
                    })}
        </fieldset>}
        <fieldset className="author-bio-story-bottom">
            <p value={story.author_id}><Link to={`/search/author/${story.author_id}`}>{story.first_name} {story.last_name}</Link> | {story.public_role} | {story.email}</p>
            <p>{story.author_blurb}</p>
            <p>You can learn more at {story.twitter_profile}, {story.facebook_profile}, {story.other_profile}</p>
        </fieldset>
        </>
    )
};