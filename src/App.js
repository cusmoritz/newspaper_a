import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { Home } from './Home';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { FooterMono } from './components/FooterMono';
import { useState } from 'react';
import { AdminHome } from './components/admin/AdminHome';
import { CreateStory } from './components/admin/CreateStory';
import { CreateStoryMono } from './components/admin/CreateStoryMono';
import { StoryStats } from './components/StoryStats';
import { AuthorPage } from './components/admin/AuthorPage';
import { AuthorPageMono } from './components/admin/AuthorPageMono';
import { TagSearchResults } from './components/TagSearchResults';
import { AuthorSearchResults } from './components/AuthorSearchResults';
import {PrimaryCatPage} from './components/PrimaryCatPage';
import { SecondaryCatPage } from './components/SecondaryCatPage';
import { SingleStoryPage } from './components/SingleStoryPage';
import { SingleStoryPageMono } from './components/SingleStoryPageMono';
import {ImageUpload} from './components/admin/ImageUpload';
import { ShopHeader } from './components/shop/ShopHeader';
import { ShopHome } from './components/shop/ShopHome';
import { ElectionCategoryPage } from './components/ElectionCategoryPage';
import { CreateSource } from './components/admin/CreateSource';
import { CreateSourceMono } from './components/admin/CreateSourceMono';
import { SourceRelatedStorysComponent } from './components/admin/SourceRelatedStorysComponent';
import { NewsPageComponent } from './components/NewsPageComponent';
import { ElectionPageComponent } from './components/ElectionPageComponent';
import { OpinionPageComponent } from './components/OpinionPageComponent';
import { OutdoorsPageComponent } from './components/OutdoorsPageComponent';
import { SportsPageComponent } from './components/SportsPageComponent';
import { EntertainmentPageComponent } from './components/EntertainmenPageComponent';
import { SecondaryCategoryComponent } from './components/SecondaryCategoryComponent';

const App = () => {

    // TODO:
    // Make sure users can't load /createstory or /authorpage without the subdomain / being logged in
    // Make RSS Feed


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
                <Header subdomain={subdomain}/>
                    <Routes>
                        <Route exact path="/" element={<AdminHome 
                            globalBreakingBool={globalBreakingBool} 
                            setGlobalBreakingBool={setGlobalBreakingBool}/>} />
                        <Route path="/createstory" element={<CreateStoryMono/>} />
                        <Route path="/storystats" element={<StoryStats/>} />
                        <Route path="/authorpage" element={<AuthorPageMono/>} />
                        <Route path="/image-upload" element={<ImageUpload />} />
                        <Route path="/sources/related-stories/:sourceId" element={<SourceRelatedStorysComponent />} /> 
                        <Route path="/sources" element={<CreateSourceMono />} />


                    </Routes>
                    <hr></hr>

                <FooterMono />
                </div>
            </BrowserRouter>

        )
    } else if (subdomain === "shop") {
        return (
            <BrowserRouter>
                <div className="App">
                <ShopHeader />
                    <Routes>
                        <Route exact path="/" element={<ShopHome />} />
                        {/* <Route path="/createstory" element={<CreateStory/>} />
                        <Route path="/storystats" element={<StoryStats/>} />
                        <Route path="/authorpage" element={<AuthorPage/>} />
                        <Route path="/image-upload" element={<ImageUpload />} /> */}
                    </Routes>
                <Footer />
                </div>
            </BrowserRouter>

        )
    } else {
        return (
            <BrowserRouter>
                <div className="App">
                <Header subdomain={subdomain}/>
                    <Routes>
                    <Route exact path="/news/:secondaryName" 
                        element={<SecondaryCategoryComponent primaryName={"news"} />} />
                    <Route exact path="/news/:secondary/:slug/:storyId" 
                        element={<SingleStoryPageMono />} />
                    <Route exact path="/news" element={<NewsPageComponent /> } />

                    <Route exact path="/elections/:secondaryName" 
                        element={<SecondaryCategoryComponent primaryName={"elections"} />} />
                        <Route exact path="/elections/:secondary/:slug/:storyId" 
                        element={<SingleStoryPageMono />} />
                    <Route exact path="/elections" element={<ElectionPageComponent />} />

                    <Route exact path="/opinion/:secondaryName" 
                        element={<SecondaryCategoryComponent primaryName={"opinion"} />} />
                        <Route exact path="/opinion/:secondary/:slug/:storyId" 
                        element={<SingleStoryPageMono />} />
                    <Route exact path="/opinion" element={<OpinionPageComponent />} />

                    <Route exact path="/outdoors/:secondaryName" 
                        element={<SecondaryCategoryComponent primaryName={"outdoors"} />} />
                    <Route exact path="/outdoors/:secondary/:slug/:storyId" 
                        element={<SingleStoryPageMono />} />
                    <Route exact path="/outdoors" element={<OutdoorsPageComponent />} />

                    <Route exact path="/sports/:secondaryName" 
                        element={<SecondaryCategoryComponent primaryName={"sports"} />} />
                    <Route exact path="/sports/:secondary/:slug/:storyId" 
                        element={<SingleStoryPageMono />} />
                    <Route exact path="/sports" element={<SportsPageComponent />} />

                    <Route exact path="/entertainment/:secondaryName" 
                        element={<SecondaryCategoryComponent primaryName={"entertainment"} />} />
                    <Route exact path="/entertainment/:secondary/:slug/:storyId" 
                        element={<SingleStoryPageMono />} />
                    <Route exact path="/entertainment" element={<EntertainmentPageComponent />} />

                    <Route path="/search/tag/:tag" element={<TagSearchResults />} />

                    <Route path="/search/author/:id" element={<AuthorSearchResults />} />
                    {/* <Route path="/news/recent-stories" element={<RecentStoriesComponent />} />
                    <Route path="/news/:slug" element={<SingleStoryPage />} />

                    <Route path="/opinion/letters" element={<LettersPageComponent />} />
                    <Route path="/opinion/columns" element={<ColumnsPageComponent />} />
                    <Route path="/opinion/editorials" element={<EditorialPageComponent />} />




                    <Route path="/outdoors/water" element={<WaterPageComponent/>} />
                    <Route path="/outdoors/land-use" element={<LandUsePageComponent />} />
                    <Route path="/outdoors/play" element={<OutdoorsPlayComponent />} />


                    <Route path="/elections/2023" element={<Election2023Component />} />
                    <Route path="/elections/2024" element={<Elections2024Component />} />

                    <Route exact path="/:primary/:secondary/:slug/:storyId" 
                        element={<SingleStoryPage /> } /> */}
{/* TODO:               <Route exact path="/search/" element={<SearchPage />} /> */}
                    {/* <Route path="/:primaryCat/:secondaryCat" element={<SecondaryCatPage />} />
                    <Route path="/:primaryCat" element={<PrimaryCatPage />} />
                    <Route exact path="/news/page/:pageNo" element={<PrimaryCatPage />} /> */}
                    {/* Do we need page numbers? */}

                    <Route path="/page/:pageNo" element={ <Home /> } /> 
                    <Route exact path="/" element={<Home />} />
                    {/* TODO: permalinks? */}
                    </Routes>
                    <hr></hr>
                <FooterMono />
                </div>
            </BrowserRouter>
            );
    }
};


export default App;

// /news => homepage
    // news/fort-collins
    // news/northern-colorado
    // news/colorado
    // news/housing
    // news/nation-world
    // news/obituaries
    // news/crime
    // news/spanish ?
    // news/story-slug-here-and-here

// other special areas?
// /elections
    // elections/2023
    // elections/2024
    // elections/????

// opinion
    // opinion/columns
    // opinion/letters
    // opinion/editorials

// entertainment
    // entertainment/music
    // entertainment/shows

// outdoors
    // outdoors/

// recent-stories
    // recent-stories/news

// trending-stories/news