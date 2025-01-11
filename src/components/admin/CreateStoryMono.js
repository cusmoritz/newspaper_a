import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { submitNewStory } from "../../api";
import { fetchAllAuthors } from "../../api";
// import { Modal } from "./Modal";
import { fetchFrontPageCatsSubcats } from "../../api";
import { fetchCurrentSources } from "../../api";

export const CreateStoryMono = () => {

    const [title, setTitle] = useState("");
    const [subhead, setSubhead] = useState("");
    const [story, setStory] = useState("");
    const [storyParagraphs, setStoryParagraphs] = useState([]);
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
    const [primary, setPrimary] = useState(0);
    const [secondary, setSecondary] = useState(0);
    const [allPrimaryCats, setPrimaryCats] = useState([]);
    const [allSecondaryCats, setSecondaryCats] = useState([]);
    const [breakingFlag, setBreakingFlag] = useState(false);
    const [breakingHeadline, setBreakingHeadline] = useState("");

    const [footnotes, setFootnotes] = useState([]);
    const [footnoteUrl, setFootnoteURL] = useState("");
    const [footnoteWords, setFootnoteWords] = useState([]);

    const [allSources, setAllSources] = useState([]); // for drop down
    const [sourcesMentioned, setStorySources] = useState([]); //ids, for submitting
    const [displaySources, setDisplaySources] = useState([]); // array so can display
    const [sourceDropDown, setSourceDropDown] = useState(0); // id of dropdown

    const [featureImage, setFeatureImage] = useState();
    const [additionalImages, setAdditionalImages] = useState([]);

    // image loading function that doesn't work. still need image hosting
    // window.addEventListener('load', function() {
    //     document.querySelector('input[type="file"]').addEventListener('change', function() {
    //         if (this.files && this.files[0]) {
    //             var img = document.querySelector('#myImg');
    //             img.onload = () => {
    //                 URL.revokeObjectURL(img.src);  // no longer needed, free memory
    //             }
      
    //             img.src = URL.createObjectURL(this.files[0]); // set src to blob url
    //         }
    //     });
    //   });

      const parseStoryText = (storyText) => {
        const paragraphs = [];
        const paragraph = storyText.split(/(\r\n|\n|\r)/gm);
        for (let i = 0; i < paragraph.length; i++) {
          if (paragraph[i].length < 1 || paragraph[i] === "\n" || paragraph[i] === "\r" || paragraph[i] === "\r\n") {
            // do nothing
          } else {
            paragraph[i].trim();
            paragraphs.push(paragraph[i]);
          }
        }
        let parsedParagraphs = [];
        paragraphs.forEach(function(paragraph, index) {
          if (typeof(paragraph) == "string" && (paragraph.includes("[") || paragraph.includes("]"))) { // paragraph has a footnote link in it

            let noteIndex = paragraph.search("]");
            let prependString = paragraph.slice(0, noteIndex);
            let postpendString = paragraph.slice(noteIndex);
            // dont want to tie together this way
            // have to tie the <a> tag on the front end
            let newPostpendString = postpendString.replace("]", `<sub><a href=#footnote-${index + 1}>[${index + 1}]</a></sub>`); 
            let newPrependString = prependString.replace("[", "");// we maybe underline the whole 'link'?

            let newPara = newPrependString.concat(newPostpendString);
            parsedParagraphs.push(newPara);
          } else {
            parsedParagraphs.push(paragraph);
          }
        })

        setStoryParagraphs(parsedParagraphs)
        console.log('parsed and all: ' ,storyParagraphs )
      }

      const fetchAllCatagories = async () => {
        const primaryCats = await fetchFrontPageCatsSubcats();
        //console.log('all?', primaryCats)
        if (primaryCats) {
          setPrimaryCats(primaryCats);
          setSecondaryCats(primaryCats[0].secondary);
        }
      }

      const submitStory = async () => {
        const result = await submitNewStory({title, subhead, storyParagraphs, tags, author, led, slug, primary, secondary, breakingFlag, breakingHeadline, footnoteWords, footnotes, sourcesMentioned});
        return result;
      }

      const validateSlug = async () => {
            const cleanSlug = slug.toLowerCase().replace(" ", "-");
            const valid = await checkSlug(cleanSlug);
      }

      const loadPage = async () => {
        const authors = await fetchAllAuthors();
        setAllAuthors(authors);
        await fetchAllCatagories();
        var sources = await fetchCurrentSources();
        if (sources) {
          //console.log('sources', sources)
          setAllSources(sources)
        }
        //console.log('Page loaded.', authors)
      };

      // const openModal = () => {
      //   const modal = document.getElementById("modal-container");
      //   modal.style.display = inline;
      //   return (
      //     <></>
      //       //<ReactModal inputText={createStoryText}/>
      //   )

      // }

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
        setBreakingFlag(false);
        setBreakingHeadline("");
        setFootnotes([]);
        setStorySources([]);
        setFeatureImage();
        setAdditionalImages([]);
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
      };

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
        //console.log('words', tagArray)
      };

      const setBreakingEvent = () => {
        if (!breakingFlag) {
          setBreakingFlag(true);
        } else {
          setBreakingFlag(false);
          setBreakingHeadline("");
        }
      };

      const submitPrimaryCategory = (primary) => { // just a number
        setPrimary(primary)
        let arr = primary - 1;
        setSecondaryCats(allPrimaryCats[arr].secondary)
      };

      const addSourceEvent = () => {
        // we want to update the display and the array for submitting
        setStorySources([...sourcesMentioned, Number(sourceDropDown)]);
        // find the obj from allSources and bump into displaySources
        let addingSource = allSources.find((s) => s.source_id == sourceDropDown);
        setDisplaySources([...displaySources, addingSource]);
        //console.log('storySources', storySources)
        return;
      }

      const handleMainImageUpload = (e) => {
        const file = e.target.files;
        if (file && file.length > 0) {
          var image = URL.createObjectURL(e.target.files[0])
          setFeatureImage(image);
        }
      };

      const handleAdditionalImageUpload = (e) => {
        const file = e.target.files;
        if (file && file.length > 0) {
          var image = URL.createObjectURL(e.target.files[0]);
          setAdditionalImages([...additionalImages, image]);
        }
      }

      return (
        <div>
            <h2>
                Create story page.
            </h2>
            <button><Link to={'/'}>Back</Link></button>
            <fieldset className="create-story">
                <legend className="grid">New story fields:</legend>

                <label  className="">Author:</label>
                <select className="" onChange={(event) => {setAuthor(event.target.value)}}>
                  <option value={null}>Select an option</option>
                {!allAuthors 
                ? null 
                : 
                    allAuthors.map((author) => {
                        return (
                            <option key={author.author_id} value={author.author_id}>{author.first_name} {author.last_name} | {author.public_role}</option>
                        )
                    })

                }
                </select>

                <br></br>

                <label htmlFor="title-input">Title:</label>
                <input className="title-input" maxLength="150" placeholder="Get to the point, but be accurate and truthful." value={title} onChange={(event) => setTitleEvent(event.target.value)}></input>
                <div className="">Title character limit: {titleChar}/150</div>

                <label htmlFor="subhead-input">Subhead:</label>
                <input className="subhead-input" maxLength="150" placeholder="This will be the secondary header after the title." value={subhead} onChange={(event) => setSubheadEvent(event.target.value)}></input>
                <div className="character-counter">Subhead character limit: {subheadChar}/150</div>

                <label htmlFor="led-input" className="tooltip">
                  Led:                    
                  {/* <span className="tooltiptext">This will show up on the front page as well as most search pages before people read the whole story.
                  </span> */}
                </label>

                <input className="led-input" maxLength="250" value={led} onChange={(event) => setLedEvent(event.target.value)} placeholder="This will be displayed on the front page of the website."></input>
                <div className="">Led character limit: {ledChar}/250</div>

                <label htmlFor="story-input" className="tooltip">Story:
                  {/* <span className="tooltiptext">To link a footnote URL to a word, wrap the word in square brackets. [Like] this.
                  </span> */}
                </label>
                <textarea className="story-input" maxLength="10000" placeholder="Input story text here. For formatting (urls, italics, etc), click Format Tips button." onChange={(event) => setStoryEvent(event.target.value)}></textarea>
                <div className="character-counter">Story character limit: {storyChar}/10,000 (Carriage returns [ ¶ ] count as a character)</div>

                <label htmlFor="footnotes-input" className="tooltip">Footnote URLs:
                  {/* <span className="tooltiptext">To add a new footnote input, click the button. These are automatically linked -- IN ORDER -- to the link tags in your story.
                  </span> */}
                </label>
                {/* {footnotes.map((footnote) => {
                  return (
                    <input key={footnote} onChange={(e) => footnote = e.target.value}></input>
                  )
                })} */}
                <input value={footnoteUrl} onChange={(e) => setFootnoteURL(e.target.value)}></input>

                <button onClick={() => setFootnotes([...footnotes, footnoteUrl])}>Add Footnote URL</button>
                <div>
                  {footnotes.length > 0 ? <h3>Entered footnotes: </h3> : null}
                  {footnotes.map((footnote, index) => {
                    //console.log(footnotes)
                    return (
                      <>
                      <p key={footnote.index}>{index + 1}: {footnote}</p><button>Delete</button>
                      </>
                    )
                  })}
                </div>

                <p>Add tags to this story. To add multiple tags, serparate tags with a comma.</p>
                <label htmlFor="tag-input">Tags:</label>
                <input className="tag-input" value={tags} onChange={(event) => setTags(event.target.value)}></input>

                <button onClick={() => setTagEvent(tags)}> Submit tags</button>
                

                <p>Add a potential SEO URL slug for this story. Good practice is to include keywords from the title and story.</p>
                <label htmlFor="slug-input">SEO slug:</label>
                <input onChange={((event) => setSlug(event.target.value))} className="slug-input" />
                <button onClick={(() => console.log('loaded'))}>Check Slug</button>

                <p>Select sources you communicated with for this story.</p>
                <label htmlFor="source-dropdown">Sources:</label>
                <select className="source-dropdown" onChange={(event) => setSourceDropDown(event.target.value)}>
                  <option value={null}>Select an option</option>
                  {!allSources ? null : 
                  allSources.map((source) => {
                    return ( // this will probably have to be a search bar at some point.
                      <option key={source.source_id} value={source.source_id}>
                        {source.source_name}; {source.source_location}; {source.source_occupation}
                      </option>
                    )
                  })
                  }
                </select>

                <button onClick={() => addSourceEvent()}> Add Source</button>
                <br></br>
                {!displaySources ? null :  
                displaySources.map((source) => {
                    return (
                      <>
                      <p key={source.source_id}>{source.source_name}; {source.source_location}; {source.source_occupation}</p>
                      {/* <button key={source.source_id + "delete"}>Delete</button> */}
                      </>
                    )
                  })
                }

                <label htmlFor="category-input">Add a primary category.</label>
                <select 
                  className="category-input" 
                  onChange={(event) => {submitPrimaryCategory(event.target.value)}}>
                    <option value={null}>Select an option</option>
                  {!allPrimaryCats ? null : 
                  allPrimaryCats.map((primary) => {
                    return (
                      <option value={primary.primary_category_id} key={primary.primary_category_id}>
                        {primary.primary_category_name}
                      </option>
                      )
                  })
                }       
                </select>

                <br></br>

                <label htmlFor="category-input">Add a secondary category.</label>
                <select onChange={(event) => setSecondary(event.target.value)}>
                  <option value={null}>Select an option</option>
                {!allSecondaryCats ? null : 
                  allSecondaryCats.map((secondary) => {
                    return (
                      <option 
                        value={secondary.secondary_category_id} 
                        key={secondary.secondary_category_id}>
                        {secondary.secondary_category_name}
                      </option>
                    )
                  })
                }    
                </select>

                <br></br>

                {/* <label htmlFor="breaking-news-flag">Is this Breaking News?</label>
                <input className="breaking-news-flag" type="checkbox" onChange={() => setBreakingEvent()} />
                {!breakingFlag ? null :
                <>
                <label htmlFor="breaking-headline">Write a brief headline.</label>
                <input className="breaking-headline" onChange={(event) => setBreakingHeadline(event.target.value)}></input>
                </>
                } */}

            </fieldset>

            <fieldset>
                <label htmlFor="feature-image-input">Feature image:</label>
                <input className="feature-image-input" type="file" accept="image/jpeg,image/png" onChange={handleMainImageUpload}></input>
                {!featureImage ? null :
                <img src={featureImage}></img>
                }
                <br></br>
                <label htmlFor="additional-image-input">Additional images:</label>
                <input className="additional-image-input" type="file" accept="image/jpeg,image/png" onChange={handleAdditionalImageUpload}></input>
                <br></br>
                {!additionalImages ? null : 
                additionalImages.map((image, index) => {
                  return (
                    <div key={index}>
                    <img src={image}></img>
                    <br></br>
                    </div>

                  )
                })
                }
            </fieldset>

            <br></br>


            <div>

                {/* TODO: add photo slug search feature?????? */}
                {/* TODO: Add Photo alt / photographer fields */}
                {/* TODO: Add ability to publish later */}

            </div>            
            <button className=""><Link to="/" onClick={() => clearFields}>Cancel</Link></button>
            &nbsp;
            <button onClick={() => submitStory(story)}>Submit new story</button>
            &nbsp;
            <button onClick={() => parseStoryText(story)}>Parse</button>
        </div>
      )
}