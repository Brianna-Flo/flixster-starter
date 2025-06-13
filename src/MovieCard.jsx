import React from "react";
import "./MovieCard.css";
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
  const [watch, setWatch] = useState(false);

  useEffect(() => {
    // check if movie previously favorited
    if (favoriteMovies.some((curr) => curr.id === data.id)) {
      setFavorite(true);
    }
    // check if movie previously watched
    if (watchedMovies.some((curr) => curr.id === data.id)) {
      setWatch(true);
    }
  }, []);

  const handleFavoriteClick = (event) => {
    event.stopPropagation();
    setFavorite((prev) => {
      onFavorite(!prev, data);
      return !prev;
    });
  };

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
        {favorite ? favorited : notFavorited}
        {watch ? watched : notWatched}
      </div>
    </div>
  );
};

export default MovieCard;
