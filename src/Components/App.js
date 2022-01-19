import React, {useState, useEffect} from 'react';
import axios from 'axios';
import uuid from 'react-uuid';
import { Checkbox } from 'semantic-ui-react';
import "../css/ImageList.css";
import ImageCard from './ImageCard';

const App = () => {
    const NASA_API_KEY = "8qrPbVE7oyc1idL6HdMaFwAUahwdAgaSPC09nkmk";

    //APOD = Astronomy Picture of the Day
    const apodCount = 20;

    const [apodList, setApodList] = useState([]); 
    const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "true" ? true : false);

    useEffect(() => {
        axios.get(`https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}&count=${apodCount}&thumbs=True`)
            .then((response) => {
                setApodList(response.data);
            });
    }, []);

    useEffect(() => {
        localStorage.setItem("darkMode", darkMode);
    }, [darkMode]);

    const imageList = apodList.map((apod) => {
        if (apod.media_type === "image") {
            return <ImageCard key={uuid()} title={apod.title} date={apod.date} img={apod.url} darkMode={darkMode} />
        } else {
            return null;
        }
    });

    console.log("outside useEffect: ", imageList);

    var fontColor = darkMode ? "fontColorDark" : "fontColorLight";
    var bgColor = darkMode ? "bgColorDark" : "bgColorLight";

    return (
        <div className={bgColor}>
            <div id='title'>
                <h1 className={fontColor}>Astronomy Picture of the Day</h1>
                <div className='darkModeToggle'>
                    <label className={fontColor} style={{marginRight: "10px"}} > Dark Mode </label>
                    <Checkbox 
                        toggle
                        checked={darkMode}
                        onClick={() => {setDarkMode(!darkMode)}}
                        style={{float: "right"}}
                    />
                </div>
            </div>
            
            <div className="image-list">{imageList}</div>
        </div>
    ) 
}

export default App;