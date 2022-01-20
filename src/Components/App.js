import React, {useState, useEffect} from 'react';
import axios from 'axios';
import uuid from 'react-uuid';
import { Checkbox } from 'semantic-ui-react';
import "../css/ImageList.css";
import ImageCard from './ImageCard';
import LoadingScreen from './LoadingScreen';

const App = () => {
    const NASA_API_KEY = "8qrPbVE7oyc1idL6HdMaFwAUahwdAgaSPC09nkmk";

    //APOD = Astronomy Picture of the Day
    const apodCount = 20;

    var imgCount = 0;

    const [apodList, setApodList] = useState([]); 
    const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "true" ? true : false);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        axios.get(`https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}&count=${apodCount}&thumbs=True`)
            .then((response) => {
                setApodList(response.data);
            });
    }, []);

    useEffect(() => {
        localStorage.setItem("darkMode", darkMode);
    }, [darkMode]);

    const numOfImg = () => {
        console.log("increment number of images")
        imgCount++;
        console.log(`count now: ${imgCount}`)
        if (imageList.length === imgCount) {
            setLoaded(true);
        }
    }

    const imageList = apodList.filter((apod) => {
        if (apod.media_type === "image") {
            return true;
        }
        return false;
    }).map((apod) => {
        return <ImageCard key={uuid()} title={apod.title} date={apod.date} img={apod.url} darkMode={darkMode} numOfImg={numOfImg} /> 
    });

    var fontColor = darkMode ? "fontColorDark" : "fontColorLight";
    var bgColor = darkMode ? "bgColorDark" : "bgColorLight";

    const hidden = loaded ? "" : "hidden";

    return (
        <div>
            {!loaded ? <LoadingScreen /> : null}
            <div className={`${bgColor} ${hidden}`}>
                <div id='title'>
                    <h1 className={fontColor}>Astronomy Pictures of the Day</h1>
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
        </div>
    )
}

export default App;