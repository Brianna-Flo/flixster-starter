import React from "react";
import "./MovieCard.css";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart as solidHeart,
  faEyeSlash,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as heartOutline } from "@fortawesome/free-regular-svg-icons";
import { useState, useEffect } from "react";

const IMG_URL = "https://image.tmdb.org/t/p/w500";

const MovieCard = ({
  data,
  onOpenModal,
  onLoadModal,
  onFavorite,
  onWatch,
  favoriteMovies,
  watchedMovies,
}) => {
  // handle click to open movie card
  const handleCardClick = (event) => {
    onOpenModal();
    onLoadModal(data);
  };

  const [favorite, setFavorite] = useState(false);

  const handleFavoriteClick = (event) => {
    event.stopPropagation();
    setFavorite((prev) => {
      onFavorite(!prev, data);
      return !prev;
    });
  };
  const [watch, setWatch] = useState(false);

  const handleWatchedClick = (event) => {
    event.stopPropagation();
    setWatch((prev) => {
      onWatch(!prev, data);
      return !prev;
    });
  };

  const watched = (
    <FontAwesomeIcon
      icon={faEye}
      id="watched"
      className="eye"
      onClick={handleWatchedClick}
    />
  );
  const notWatched = (
    <FontAwesomeIcon
      icon={faEyeSlash}
      id="not-watched"
      className="eye"
      onClick={handleWatchedClick}
    />
  );

  const favorited = (
    <FontAwesomeIcon
      icon={solidHeart}
      id="favorited"
      className="heart"
      onClick={handleFavoriteClick}
    />
  );
  const notFavorited = (
    <FontAwesomeIcon
      icon={heartOutline}
      id="not-favorited"
      className="heart"
      onClick={handleFavoriteClick}
    />
  );

  // check if movie previously favorited (in favorites list)
  const checkIfFavorited = favoriteMovies.some((curr) => curr.id === data.id);
  const checkIfWatched = watchedMovies.some((curr) => curr.id === data.id);

  useEffect(() => {
    if (checkIfFavorited) {
      setFavorite(true);
    }
    if (checkIfWatched) {
      setWatch(true);
    }
  }, []);

  return (
    <div className={`movie-card ${favorite}`} onClick={() => handleCardClick()}>
      <img
        className="movie-poster"
        src={`${IMG_URL}${data.image}`}
        alt={data.title}
      />
      <div className="movie-info">
        <h4>{data.title}</h4>
        <p>Rating: {data.rating}</p>
      </div>
      <div className="buttons">
        {/* {(favorite || checkIfFavorited) ? favorited : notFavorited} */}
        {favorite ? favorited : notFavorited}
        {/* {(watch || checkIfWatched) ? watched : notWatched} */}
        {watch ? watched : notWatched}
      </div>
    </div>
  );
};

// MovieCard.propTypes = {
//     image: PropTypes.string.isRequired,
//     title: PropTypes.string.isRequired,
//     rating: PropTypes.string.isRequired
// }

export default MovieCard;
