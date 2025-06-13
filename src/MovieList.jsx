import React from 'react';
import './MovieList.css'
import MovieCard from './MovieCard';
import { useState, useEffect } from "react";


import { parseMovieData } from './utils/utils'

const MovieList = ({ onLoadMore, data, morePages, onOpenModal, onLoadModal, genreData, onFavorite, onWatch, fetching, favoriteMovies, watchedMovies }) => {
    if (data.length === 0) {
        return <p>No search matches</p>
    }
    // handler function for clicking load more movies (increment page by 1)
    const handleClick = (event) => {
        event.preventDefault();
        onLoadMore ();
    }

    let filteredMovies = data;
    if (fetching) {
        // create an array containing only necessary movie data
        const parsedMovies = parseMovieData(data, genreData);
        // create an array filtering out movies with null images
        filteredMovies = parsedMovies.filter((movie) => movie.image !== null);
    }


    // display button only if there are more pages to load
    let content = <></>;
    if (morePages) {
        content = <button onClick={handleClick}>Load More</button>;
    }
    return (
        <section>
            <div className="movie-card-container">
            {
                // create a new array of MovieCard components
                filteredMovies.map((movie) => {
                    return (
                        // create a movie card component for each movie in array using parsed data
                        <MovieCard key={movie.id} data={movie} onOpenModal={onOpenModal} onLoadModal={onLoadModal} onFavorite={onFavorite} onWatch={onWatch} favoriteMovies={favoriteMovies} watchedMovies={watchedMovies}/>
                    )
                })
            }
            </div>
        
        {/* <button onClick={handleClick}>Load More</button> */}
        {content}
        </section>
    )
}

export default MovieList;