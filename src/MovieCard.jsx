import React from 'react';
import './MovieCard.css';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeart as heartOutline } from '@fortawesome/free-regular-svg-icons'
import { useState, useEffect } from "react";

const IMG_URL = 'https://image.tmdb.org/t/p/w500';

const MovieCard = ({data, onOpenModal, onLoadModal}) => {
    // handle click to open movie card
    const handleCardClick = (event) => {
        onOpenModal();
        onLoadModal(data);
    }

    const [favorite, setFavorite] = useState();
    
    const handleFavoriteClick = (event) => {
        event.stopPropagation();
        setFavorite((prev) => !prev)
    }
    const favorited = <FontAwesomeIcon icon={solidHeart} id="favorited" className="heart" onClick={handleFavoriteClick}/>
    const notFavorited = <FontAwesomeIcon icon={heartOutline} id="not-favorited" className="heart" onClick={handleFavoriteClick}/>

    return (
        <div className="movie-card" onClick={() => handleCardClick()}>
            <img className="movie-poster" src={`${IMG_URL}${data.image}`} alt={data.title}/>
            <div className="movie-info">
                <h4>{data.title}</h4>
                <p>Rating: {data.rating}</p>
            </div>
            <div>
                {favorite ? favorited : notFavorited}
            </div>
        </div>
    )
}

// MovieCard.propTypes = {
//     image: PropTypes.string.isRequired,
//     title: PropTypes.string.isRequired,
//     rating: PropTypes.string.isRequired
// }

export default MovieCard;