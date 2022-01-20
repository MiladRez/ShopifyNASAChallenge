import React from 'react';
import uuid from 'react-uuid';
import ImageCard from './ImageCard';

const ImageList = ({apodList, darkMode}) => {
    const imageList = apodList.filter((apod) => {
        if (apod.media_type === "image") {
            return true;
        }
        return false;
    }).map((apod) => {
        return <ImageCard key={uuid()} title={apod.title} date={apod.date} img={apod.url} darkMode={darkMode} /> 
    });

    return (
        <div className="image-list">{imageList}</div>
    );
}

export default ImageList;