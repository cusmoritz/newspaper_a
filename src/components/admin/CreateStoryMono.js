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
        console.log('storyParse', paragraphs)

        setStoryParagraphs(paragraphs)

        let hyperlinkWord = [];

        storyParagraphs.forEach(function(paragraph, index) {
          const hyperlink = paragraph.match(/\[(.*?)\]/g);
          console.log('hyperlink', hyperlink, index)

          if (hyperlink) {
            // take square brackets off
            hyperlink.flat(); 
            for (let i = 0; i < hyperlink.length; i++) { 
              // more than 1 hyperlink in paragraph
              // take the brackets off the word or phrase
              let noBrackets = hyperlink[i].replace(/[\[\]']+/g, ""); 
              //console.log('no brackets', noBrackets)
              let position = paragraph.indexOf(hyperlink);
              let newpara = paragraph.at(position).replace(hyperlink, noBrackets);
              console.log('new parap', newpara)
              hyperlinkWord.push({word: noBrackets, paragraph: index})
            }
            // var bracket = 
            // console.log('bracket')
            //hyperlink.replace(/[\[\]']+/g, "");
            
          }
        });
        console.log('array of objects', hyperlinkWord)
        console.log('still story text', storyParagraphs)

        setFootnoteWords(hyperlinkWord)
        //const bracketsOut = storyText.match(/\[(.*?)\]/g);
        //console.log('what', noBreaks)
        //console.log('urls?', bracketsOut)
        //setFootnoteWords(bracketsOut);
        console.log('footnotes? ', footnoteWords)


        // const serializeEditorValueAsString = value => {
        //   value
        //   //Return the string content of each paragraph in the value's children
        //   .map(n => Node.toString(n))//slate node? 31:03 https://www.youtube.com/watch?v=kMpLh2XCWqM
        //   // join them all with line breaks denoting paragraphs
        //   .join('\n')// he's saving the text as a string and the body_data as a json object
        // }
        // serializeEditorValueAsString(storyText)
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
        setBreakingFlag(false);
        setBreakingHeadline("");
        setFootnotes([]);
        setStorySources([]);
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

      return (
        <div>
            <h3>
                Create a story by populating the fields below.
            </h3>
            <button className=""><Link to="/" onClick={() => clearFields}>Cancel</Link></button>
            <fieldset className="create-story">
                <legend className="grid">New story fields:</legend>

                <label  className="">Author:</label>
                <select className="" onChange={(event) => {setAuthor(event.target.value)}}>
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

            </fieldset>
        </div>
      )
}