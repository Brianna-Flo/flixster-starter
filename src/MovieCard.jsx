import React from 'react';
import './MovieCard.css';
import PropTypes from 'prop-types';
import { useState } from 'react';


const IMG_URL = 'https://image.tmdb.org/t/p/w500';

const MovieCard = ({image, title, rating, onOpenModal}) => {
    // handle click to open movie card
    const handleCardClick = (event) => {
        console.log("modal clicked");
        
        onOpenModal();
    }

    return (
        <div className="movie-card" onClick={() => handleCardClick()}>
            {/* <img src={`${props.image}`} /> */}
            <img className="movie-poster" src={`${IMG_URL}${image}`} alt={title}/>
            <div className="movie-info">
                <h4>{title}</h4>
                <p>Rating: {rating}</p>
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