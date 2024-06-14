import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { Home } from './Home';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { useState } from 'react';
import { AdminHome } from './components/admin/AdminHome';
import { CreateStory } from './components/admin/CreateStory';
import { StoryStats } from './components/StoryStats';
import { AuthorPage } from './components/admin/AuthorPage';
import { TagSearchResults } from './components/TagSearchResults';
import { AuthorSearchResults } from './components/AuthorSearchResults';
import {PrimaryCatPage} from './components/PrimaryCatPage';
import { SecondaryCatPage } from './components/SecondaryCatPage';
import { SingleStoryPage } from './components/SingleStoryPage';
import {ImageUpload} from './components/admin/ImageUpload';

const App = () => {

    // TODO:
    // Make sure users can't load /createstory or /authorpage without the subdomain / being logged in
    // Make RSS Feed

    const updatePageViews = async (storyId) => {
        const success = await addPageView(storyId);
        return success;
    }

    // useEffect(() => {
    //     health();
    // }, []);

    // there's probably a safer and better way to do this?
    const domain = /:\/\/([^\/]+)/.exec(window.location.href)[1];
    // console.log('view', domain)
    const subdomain = domain.split('.')[0];
    console.log('subdomain', subdomain)

    const [globalBreakingBool, setGlobalBreakingBool] = useState(false);
    const [globalBreakingHeadline, setGlobalBreakingHeadline] = useState("");
    const [globalBreakingNewsPath, setGlobalBreakingNewsPath] = useState({});

    // const fullDomain = /:\/\/([^\/]+)/.exec(window.location.href)

    if (subdomain === "admin") {
        return (
            <BrowserRouter>
                <div className="App">
                <Header />
                    <Routes>
                        <Route exact path="/" element={<AdminHome 
                            globalBreakingBool={globalBreakingBool} 
                            setGlobalBreakingBool={setGlobalBreakingBool}/>} />
                        <Route path="/createstory" element={<CreateStory/>} />
                        <Route path="/storystats" element={<StoryStats/>} />
                        <Route path="/authorpage" element={<AuthorPage/>} />
                        <Route path="/image-upload" element={<ImageUpload />} />
                    </Routes>
                <Footer />
                </div>
            </BrowserRouter>

        )
    } else {
        return (
            <BrowserRouter>
                <div className="App">
                <Header 
                globalBreakingBool={globalBreakingBool} 
                globalBreakingHeadline={globalBreakingHeadline}
                globalBreakingNewsPath={globalBreakingNewsPath} />
                    <Routes>
                    {/* /search/author should be all authors */}
                    <Route path="/search/tag/:tag" element={<TagSearchResults />} />
                    <Route path="/search/author/:id" element={<AuthorSearchResults />} />
                    <Route exact path="/:primary/:secondary/:slug/:storyId" 
                        element={<SingleStoryPage /> } />
{/* TODO:               <Route exact path="/search/" element={<SearchPage />} /> */}
                    <Route path="/:primaryCat/:secondaryCat" element={<SecondaryCatPage />} />
                    <Route path="/:primaryCat" element={<PrimaryCatPage />} />
                    <Route exact path="/" 
                        element={<Home 
                            setGlobalBreakingBool={setGlobalBreakingBool} 
                            setGlobalBreakingHeadline={setGlobalBreakingHeadline}
                            setGlobalBreakingNewsPath={setGlobalBreakingNewsPath}/>} 
                    />
                    {/* how do we build this out to include primary cactegory, subcategory, story slug and story id? */}
                    </Routes>
                <Footer />
                </div>
            </BrowserRouter>
            );
    }
};


export default App;