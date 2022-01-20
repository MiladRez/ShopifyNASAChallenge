import React, {useState, useRef, useEffect} from 'react';
import Heart from 'react-animated-heart';
import '../css/ImageCard.css';

const ImageCard = ({title, date, img, darkMode, numOfImg}) => {

    const [span, setSpan] = useState(0);
    const [liked, setLiked] = useState(false);

    const cardRef = useRef(null);
    const imageRef = useRef(null);

    useEffect(() => {
        imageRef.current.addEventListener("load", handleSpan);
    }, [imageRef]);

    const handleSpan = () => {
        const height = cardRef.current.offsetHeight;
        const span = Math.ceil(height/31);
        console.log("inside useEffect")
        numOfImg();
        setSpan(span);
    }

    var fontColor = darkMode ? "fontColorDark" : "fontColorLight";
    var bgColor = darkMode ? "bgColorCardDark" : "bgColorCardLight";

    return (
        <div className="column" style={{gridRowEnd: `span ${span}`}}>
            <div className={`ui segment ${bgColor}`} ref={cardRef} style={{width: 480}}>
                <img ref={imageRef} src={img} alt="Sorry, image not available." />
                <div style={{paddingTop: "10px", paddingLeft: "5px"}}>
                    <h3 className={fontColor}>{title}</h3>
                    <p className={fontColor}>{date}</p>
                    <Heart isClick={liked} onClick={() => {setLiked(!liked)}} />
                </div>
            </div>
        </div>
    )
}

export default ImageCard;