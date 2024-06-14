import React from "react";
import { ShopNavBar } from './ShopNavBar';

export const ShopHeader = () => {
    return (
            <div className="header-container">
                <img src="https://placehold.jp/150x150.png" className="logo" alt="The Tooth logo"/>
                <hr></hr>
                <ShopNavBar />
            </div>
    )
};