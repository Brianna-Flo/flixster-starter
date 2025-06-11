import React from 'react';
import './MovieCard.css';
import PropTypes from 'prop-types';


const IMG_URL = 'https://image.tmdb.org/t/p/w500';

const MovieCard = ({image, title, rating}) => {
    return (
        <div className="movie-card">
            {/* <img src={`${props.image}`} /> */}
            <img className="movie-poster" src={`${IMG_URL}${image}`}/>
            <h4>{title}</h4>
            <p>Rating: {rating}</p>
        </div>
    )
}

// MovieCard.propTypes = {
//     image: PropTypes.string.isRequired,
//     title: PropTypes.string.isRequired,
//     rating: PropTypes.string.isRequired
// }

export default MovieCard;