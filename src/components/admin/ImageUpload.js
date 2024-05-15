import React from "react";
import { useEffect } from "react";
import { useState } from "react";

export const ImageUpload = () => {

    // Get the form and file field
    // let form = document.querySelector('#upload');
    // let file = document.querySelector('#file');
    let app = document.querySelector('#image-preview');

    const [photo, setPhoto] = useState(undefined);

    function handleSubmit (event) {
        event.preventDefault();
        console.log(event)

        const url = URL.createObjectURL(event.target.files[0]); // this does give us the url
        console.log('url', url)
        setPhoto(url);

        // Create a new FileReader() object
        let reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]) // this is the Blob
        // Setup the callback event to run when the file is read
        reader.onload = function() {
            console.log(reader.result);
        };
        reader.onerror = function() {
            console.log(reader.error);
        };

    }

    // function logFile (event) {
    //     // let str = event.target.result;
    //     // let img = document.createElement('img');
    //     // img.src = str;
    //     // app.append(img);
    //     console.log(event);
    // }

    return (
        <>
        <form id="upload">
            <label htmlFor="file">File to upload</label>
            <input type="file" id="file" accept="image/*" onChange={(event) => handleSubmit(event)}/>

            {/* <button onSubmit={(event) => handleSubmit(event)}>Upload</button> */}
        </form>
        {!photo ? null : <img src={photo} />}

        </>
        
    )
}