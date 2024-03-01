import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { Home } from './Home';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

import { AdminHome } from './components/AdminHome';
import { CreateStory } from './components/CreateStory';
import { StoryStats } from './components/StoryStats';
import { AuthorPage } from './components/AuthorPage';


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
    console.log('view', domain)
    const subdomain = domain.split('.')[0];
    console.log('subdomain', subdomain)

    if (subdomain === "admin") {
        return (
            <BrowserRouter>
                <div className="App">
                    <Header />
                    <Routes>
                        <Route exact path="/" element={<AdminHome/>} />
                        <Route path="/createstory" element={<CreateStory/>} />
                        <Route path="/storystats" element={<StoryStats/>} />
                        <Route path="/authorpage" element={<AuthorPage/>} />
                    </Routes>
                    <Footer />
                </div>
            </BrowserRouter>
        )
    } else {
        return (
            <BrowserRouter>
                <div className="App">
                    <Header />
                    <Routes>
                    <Route exact path="/" element={<Home/>} />
                    {/* <Route path="/story/:slug" element={<Story />} /> */}
                    </Routes>
                    <Footer />
                </div>
            </BrowserRouter>
            );
    }
};


export default App;