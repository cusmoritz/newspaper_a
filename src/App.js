import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './Home';
import { Header } from './Header';
import { Footer } from './Footer';


const App = () => {
return (
    <BrowserRouter>
        <div className="App">
            <Header />
            <Routes>
            <Route exact path="/" element={<Home/>} />

            </Routes>
            <Footer />
        </div>
    </BrowserRouter>
    );

};


export default App;