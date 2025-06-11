import React from "react";
import "./Modal.css";

const IMG_URL = 'https://image.tmdb.org/t/p/w500';


const Modal = ({ onCloseModal, modalData}) => {
  const handleModalClose = (event) => {
    console.log("pressed close");
    onCloseModal();
  };

  return (
    <div className="modal" id="movie-modal">
      <div className="modal-content">
        <h2 id="movie-title">{modalData.title}</h2>
        <img id="movie-img" width="100px" src={`${IMG_URL}${modalData.image}`} />
        <p id="release-date">Release Date: {modalData.releaseDate}</p>
        <p id="overview">Overview: {modalData.overview}</p>
        <p id="genres">Genres: {modalData.genres}</p>
        <button className="close" onClick={handleModalClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
