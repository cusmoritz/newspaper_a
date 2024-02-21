import React from "react";

export const Story = () => {

    const updatePageViews = () => {

    }

    // params path = /story/:slug

    return (
        <div className="story-container">
            <div className="feature-image-container">
                <img src="https://placehold.jp/1000x500.png" className="story-feature-image" />
            </div>
            <h3>This is the story headline</h3>
            <h4>This is the story subhead or deck</h4>
            <div className="byline-container">
                <p className="byline-p">By Marcus Moritz</p>
                <p className="byline-email">marcus@thetooth.com</p>
            </div>
            <div className="editors-note">
                This is an editor's note about this story. -- Ed
            </div>
            <div>
                There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.
            </div>
            <img src="https://placehold.jp/300x300.png" />
            <div>
                It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
            </div>
        </div>
    );
};