import React, {useState, useEffect} from 'react';
import axios from 'axios';
import uuid from 'react-uuid';
import "../css/ImageList.css";
import ImageCard from './ImageCard';

const App = () => {
    const NASA_API_KEY = "8qrPbVE7oyc1idL6HdMaFwAUahwdAgaSPC09nkmk";

    //APOD = Astronomy Picture of the Day
    const apodCount = 20;

    const [apodList, setApodList] = useState([]); 

    useEffect(() => {
        axios.get(`https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}&count=${apodCount}&thumbs=True`)
            .then((response) => {
                setApodList(response.data);
            });
    }, []);

    const handleLiked = (isLiked, img) => {
        localStorage.setItem("liked", {img_url: img, liked: isLiked});
    }

    const imageList = apodList.map((apod) => {
        if (apod.media_type == "image") {
            const isReturningUser = "liked" in localStorage;
            const savedMode = localStorage.getItem("liked") === {img_url: apod.url, liked: true} ? true : false;
            const isLiked = isReturningUser ? savedMode : false;

            return <ImageCard key={uuid()} title={apod.title} date={apod.date} img={apod.url} handleLiked={handleLiked} liked={isLiked} />
        }
    });

    console.log("outside useEffect: ", imageList);

    return (
        <div>
            <div className="image-list">{imageList}</div>
        </div>
    ) 
}

export default App;