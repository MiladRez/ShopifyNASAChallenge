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

    var watched = Math.floor(Math.random() * 999) + 100;

    return (
        <div className="column" style={{gridRowEnd: `span ${span}`}}>
            <div className={`ui segment ${bgColor}`} ref={cardRef} style={{width: 480}}>
                <img ref={imageRef} src={img} alt="Sorry, image not available." />
                <div style={{paddingTop: "10px", paddingLeft: "5px"}}>
                    <h3 className={fontColor}>{title}</h3>
                    <span className='heartIcon'><Heart isClick={liked} onClick={() => {setLiked(!liked)}} /></span>
                    <p className={fontColor}>{date}</p>
                    <div className='eyecon'>
                        <i className={`eye icon ${fontColor}`} style={{fontSize: "25px", display: "inline-flex"}}>
                            <span style={{fontFamily: "Lato", marginLeft: "10px"}}> {watched}</span>
                        </i>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ImageCard;