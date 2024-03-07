import React from "react";

export const Modal = (inputText) => {

    return (
        <div className="modal-container">
            <button className="modal-close">X</button>
            <div className="modal-text-container">
                {inputText}
            </div>
        </div>
    )
};