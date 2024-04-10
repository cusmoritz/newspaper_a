import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { submitNewStory } from "../api";
import { fetchAllAuthors } from "../api";
import { Modal } from "./Modal";
import { fetchFrontPageCatsSubcats } from "../api";

export const CreateStory = () => {

    const [title, setTitle] = useState("");
    const [subhead, setSubhead] = useState("");
    const [story, setStory] = useState("");
    const [tags, setTags] = useState([]);
    const [author, setAuthor] = useState(0);
    const [slug, setSlug] = useState("");
    const [led, setLed] = useState("");
    const [allAuthors, setAllAuthors] = useState([]);
    const [titleChar, setTitleChar] = useState(0);
    const [subheadChar, setSubheadChar] = useState(0);
    const [ledChar, setLedChar] = useState(0);
    const [storyChar, setStoryChar] = useState(0);
    const [showModal, setShowModal] = useState("none");
    const [primary, setPrimary] = useState([]);
    const [secondary, setSecondary] = useState([]);
    const [allPrimaryCats, setPrimaryCats] = useState([]);
    const [allSecondaryCats, setSecondaryCats] = useState([]);

    // image loading function that doesn't work. still need image hosting
    window.addEventListener('load', function() {
        document.querySelector('input[type="file"]').addEventListener('change', function() {
            if (this.files && this.files[0]) {
                var img = document.querySelector('#myImg');
                img.onload = () => {
                    URL.revokeObjectURL(img.src);  // no longer needed, free memory
                }
      
                img.src = URL.createObjectURL(this.files[0]); // set src to blob url
            }
        });
      });

      const fetchAllCatagories = async () => {
        const primaryCats = await fetchFrontPageCatsSubcats();
        console.log('all?', primaryCats)
        if (primaryCats) {
          setPrimaryCats(primaryCats);
          setSecondaryCats(primaryCats[0].secondary)
        }
      }

      const submitStory = async () => {
        const result = await submitNewStory({title, subhead, story, tags, author: '2', led, slug, primary, secondary});
        return result;
      }

      const validateSlug = async () => {
            const cleanSlug = slug.toLowerCase().replace(" ", "-");
            const valid = await checkSlug(cleanSlug);
      }

      const loadPage = async () => {
        const authors = await fetchAllAuthors();
        setAllAuthors(authors);
        fetchAllCatagories();
        console.log('Page loaded.', authors)
      };

      const createStoryText = "There is text in here."

      const openModal = () => {
        const modal = document.getElementById("modal-container");
        modal.style.display = inline;
        return (
          <></>
            //<ReactModal inputText={createStoryText}/>
        )

      }

      useState(() => {
        loadPage();
      }, []);

      const clearFields = () => {
        setTitle("");
        setSubhead("");
        setStory("");
        setTags("");
        setAuthor("");
        setSlug("");
        setLed("");
        setTitleChar(0);
        setSubheadChar(0);
        setLedChar(0);
        setPrimary([]);
        setSecondary([]);
      }

      const setTitleEvent = (targetValue) => {
        setTitle(targetValue);
        setTitleChar(targetValue.length);
      };

      const setSubheadEvent = (subheadValue) => {
        setSubhead(subheadValue);
        setSubheadChar(subheadValue.length);
      };

      const setLedEvent = (ledValue) => {
        setLed(ledValue);
        setLedChar(ledValue.length);
      };

      const setStoryEvent = (storyValue) => {
        setStory(storyValue);
        setStoryChar(storyValue.length);
      }

      const setTagEvent = (tagValue) => {
        if (tagValue.length < 1) {
          return;
        }
        // split the tags
        const words = tagValue.split(",");
        let tagArray = [];
        for (let i = 0; i < words.length; i++) {
            tagArray.push(words[i].trim())
        }
        setTags(tagArray);
        console.log('words', tagArray)
      };

      const submitPrimaryCatagory = (primary) => { // just a number
        setPrimary(primary)
        let arr = primary - 1;
        setSecondaryCats(allPrimaryCats[arr].secondary)
      };

    return (
        <div className="create-story-container">
            <h3>Create a story by populating the fields below.</h3>
            <Link to="/" onClick={() => clearFields}><button>Cancel</button></Link>

            <fieldset className="story-fieldset">
            <legend>New story fields:</legend>
            <label htmlFor="author-dropdown" className="author-dropdown">Author:</label>
                <select className="author-dropdown">
                {!allAuthors 
                ? null 
                : 
                    allAuthors.map((author) => {
                        return (
                            <option onChange={(event) => {setAuthor(event.target.value)}} key={author.author_id} value={author.author_id}>{author.first_name} {author.last_name} | {author.public_role}</option>
                        )
                    })

                }
                </select>

                {/* <select className="author-dropdown" onChange={(event) => setAuthor(event.target.value)}>
                    <option value="5">Author A</option>
                    <option value="4">Author B</option>
                    <option value="3">Author C</option>
                    <option value="2">Author D</option>
                    <option value="1">Author E</option>
                </select> */}

                <label htmlFor="title-input">Title:</label>
                <input className="title-input" maxLength="150" placeholder="Get to the point, but be accurate and truthful." value={title} onChange={(event) => setTitleEvent(event.target.value)}></input>
                <div className="character-counter">Title character limit: {titleChar}/150</div>

                <label htmlFor="subhead-input">Subhead:</label>
                <input className="subhead-input" maxLength="150" placeholder="This will be the secondary header after the title." value={subhead} onChange={(event) => setSubheadEvent(event.target.value)}></input>
                <div className="character-counter">Subhead character limit: {subheadChar}/150</div>

                <label htmlFor="led-input">Led:</label>
                <textarea className="led-input" maxLength="250" value={led} onChange={(event) => setLedEvent(event.target.value)} placeholder="Your best, catchiest sentence. This will be displayed on the front page of the website."></textarea>
                <div className="character-counter">Led character limit: {ledChar}/250</div>

                <label htmlFor="story-input">Story:</label>
                <textarea className="story-input" maxLength="10000" placeholder="Input story text here. For formatting (urls, italics, etc), click Format Tips button." value={story} onChange={(event) => setStoryEvent(event.target.value)}></textarea>
                <div className="character-counter">Story character limit: {storyChar}/10,000 (Carriage returns [ ¶ ] count as a character)</div>

                <button className="story-format-tips" onClick={() => setShowModal('block')}>Format tips</button>
                {/* <Modal state={showModal}/> */}

                
                <label htmlFor="tag-input">Add tags to this story. To add multiple tags, serparate tags with a comma.</label>
                <input className="tag-input" value={tags} onChange={(event) => setTags(event.target.value)}></input>
                <button onClick={() => setTagEvent(tags)}> Submit tags</button>

                <label htmlFor="slug-input">Add a potential SEO URL slug for this story: </label>
                <input onChange={((event) => setSlug(event.target.value))} className="slug-input" />
                <button onClick={(() => console.log('loaded'))}>Check Slug</button>

                {/* TODO: Add ability to add urls inside of story */}

                <label htmlFor="catagory-input">Add a primarycatagory.</label>
                <select 
                  className="catagory-input" 
                  onChange={(event) => {submitPrimaryCatagory(event.target.value)}}>
                {!allPrimaryCats ? null : 
                  allPrimaryCats.map((primary) => {
                    return (
                      <option value={primary.primary_catagory_id} key={primary.primary_catagory_id}>
                        {primary.primary_catagory_name}
                      </option>
                      )
                  })
                }       
                </select>

            <label htmlFor="catagory-input">Add a secondary catagory.</label>
            <select onChange={(event) => setSecondary(event.target.value)}>
            {!allSecondaryCats ? null : 
              allSecondaryCats.map((secondary) => {
                return (
                  <option 
                    value={secondary.secondary_catagory_id} 
                    key={secondary.secondary_catagory_id}>
                    {secondary.secondary_catagory_name}
                  </option>
                )
              })
            }    
            </select>
                {/* <button onClick={submitPrimaryCatagory()}>Submit</button> */}
                
            </fieldset>
            <fieldset className="photo-fieldset">
                <label htmlFor="feature-image-input" id="feature-upload">Feature image:</label>
                <input type="file" className="feature-image-input"></input>
                <label htmlFor="additional-image-input">Additional images:</label>
                <input type="file" className="additional-image-input"></input>
                <br></br>
                <img id="myImg" src="#" height="200px" width="200px"/>
            </fieldset>
            <div>

                {/* TODO: add photo slug search feature?????? */}
                {/* TODO: Add Photo alt / photographer fields */}
                {/* TODO: Add ability to publish later */}

            </div>
            <button onClick={() => submitStory()}>Submit new story</button>
        </div>
    );
};