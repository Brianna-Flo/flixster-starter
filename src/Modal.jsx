import React from "react";
import "./Modal.css";

const Modal = () => {
    console.log("in modal");
  return (
    <div id="movie-modal">
      <h2 id="movie-title">Movie Title</h2>
      <img id="movie-img" src="" />
      <p id="release-date">Release Date</p>
      <p id="overview">Overview: overview of movie</p>
      <p id="genres">Genres: genres</p>
      <button id="close">Close</button>
      {/* <span class="close">&times;</span> */}
    </div>
  );
};

export default Modal;
