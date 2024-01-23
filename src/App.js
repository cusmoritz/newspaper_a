import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './Home';


const App = () => {
return (
    <BrowserRouter>
        <div className="App">
            <Routes>
            <Route exact path="/" element={<Home/>} />

            </Routes>
        </div>
    </BrowserRouter>
    );

};


export default App;