import React from 'react';
import './MovieCard.css';
import PropTypes from 'prop-types';

const IMG_URL = 'https://image.tmdb.org/t/p/w500';

const MovieCard = ({data, onOpenModal, onLoadModal}) => {
    // handle click to open movie card
    const handleCardClick = (event) => {
        onOpenModal();
        onLoadModal(data);
    }

    return (
        <div className="movie-card" onClick={() => handleCardClick()}>
            <img className="movie-poster" src={`${IMG_URL}${data.image}`} alt={data.title}/>
            <div className="movie-info">
                <h4>{data.title}</h4>
                <p>Rating: {data.rating}</p>
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