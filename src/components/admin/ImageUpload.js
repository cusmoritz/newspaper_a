import React from "react";
import { useEffect } from "react";
import { useState } from "react";

export const ImageUpload = () => {

    // Get the form and file field
    // let form = document.querySelector('#upload');
    // let file = document.querySelector('#file');
    let app = document.querySelector('#image-preview');

    const [photos, setPhotos] = useState([]);

    function handleAddPhotos (e) {
        const file = e.target.files;
        if (file && file.length > 0) {
            var image = URL.createObjectURL(e.target.files[0])
            setPhotos([...photos, image]);
          }
    }

    const handlePhotoSubmit = () => {
        if (photos.length > 0) {
            console.log('photos: ', photos)
            // send photos to db
        }
    }

    return (
        <>
        <form id="upload">
            <label htmlFor="file">File to upload</label>
            <input type="file" id="file" accept="image/*" onChange={handleAddPhotos}/>
        </form>
        {!photos ? null : 
        photos.map((image) => {
            return (
                <img src={image}></img>
            )
        })
        }
        <button onClick={handlePhotoSubmit}>Submit Photos</button>
        </>
        
    )
}