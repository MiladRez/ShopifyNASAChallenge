import React, {useState, useRef, useEffect} from 'react';
import Heart from 'react-animated-heart';

const ImageCard = ({title, date, img, handleLiked, isLiked}) => {

    const [span, setSpan] = useState(0);
    const [liked, setLiked] = useState(isLiked);

    const cardRef = useRef(null);
    const imageRef = useRef(null);

    useEffect(() => {
        imageRef.current.addEventListener("load", handleSpan);
    });

    const handleLikedClick = () => {
        setLiked(!liked);
        handleLiked(liked, img);
    }

    const handleSpan = () => {
        const height = cardRef.current.offsetHeight;
        const span = Math.ceil(height/31);
        setSpan(span);
    }

    return (
        <div className="column" style={{gridRowEnd: `span ${span}`}}>
            <div className="ui segment" ref={cardRef} style={{backgroundColor: "#e8e8e8", width: 480}}>
                <img ref={imageRef} src={img} alt="Sorry, image not available."/>
                <div style={{paddingTop: "10px", paddingLeft: "5px"}}>
                    <h3>{title}</h3>
                    <p>{date}</p>
                    <Heart isClick={liked} onClick={handleLikedClick} />
                </div>
            </div>
        </div>
    )
}

export default ImageCard;