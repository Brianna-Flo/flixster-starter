import React from "react";
import "./Modal.css";

const IMG_URL = "https://image.tmdb.org/t/p/w500";

const Modal = ({ onCloseModal, modalData }) => {

  return (
    <section className="modal" id="movie-modal">
      <div className="modal-content">
        <span className="modal-close" onClick={onCloseModal}>
          &times;
        </span>
        <h2 id="movie-title">{modalData.title}</h2>
        <img
          id="movie-img"
          width="100%"
          src={`${IMG_URL}${modalData.backdrop}`}
        />
        <p id="release-date">
          <b>Release Date:</b> {modalData.releaseDate}
        </p>
        <p id="overview">
          <b>Overview: </b>
          {modalData.overview}
        </p>
        <p id="genres">
          <b>Genres: </b>
          {modalData.genres.join(", ")}
        </p>
        <p id="runtime">
          <b>Runtime:</b> {modalData.runtime}
        </p>
        <iframe
          width="560"
          height="315"
          src={modalData.trailer}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
    </section>
  );
};

export default Modal;
