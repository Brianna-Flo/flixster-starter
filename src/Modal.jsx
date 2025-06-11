import React from "react";
import "./Modal.css";

const Modal = ({ onCloseModal }) => {
  const handleModalClose = (event) => {
    console.log("pressed close");
    onCloseModal();
  };

  return (
    <div className="modal" id="movie-modal">
      <div className="modal-content">
        <h2 id="movie-title">Movie Title</h2>
        <img id="movie-img" src="" />
        <p id="release-date">Release Date</p>
        <p id="overview">Overview: overview of movie</p>
        <p id="genres">Genres: genres</p>
        <button className="close" onClick={handleModalClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
