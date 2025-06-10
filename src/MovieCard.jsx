import React from 'react';
import './MovieCard.css';

const MovieCard = (props) => {
    return (
        <div className="movie-card">
            <img src={props.image} />
            <h1>{props.title}</h1>
            <p>Rating: {props.rating}</p>
        </div>
    )
}

export default MovieCard;