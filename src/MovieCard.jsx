import React from 'react';
import './MovieCard.css';

const IMG_URL = 'https://image.tmdb.org/t/p/w500';

const MovieCard = (props) => {
    return (
        <div className="movie-card">
            {/* <img src={`${props.image}`} /> */}
            <img className="movie-poster" src={`${IMG_URL}${props.image}`}/>
            <h4>{props.title}</h4>
            <p>Rating: {props.rating}</p>
        </div>
    )
}

export default MovieCard;