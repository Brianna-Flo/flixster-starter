import React from 'react';
import './MovieList.css'
import MovieCard from './MovieCard';

import { parseMovieData } from './utils/utils'

const MovieList = ({ onLoadMore, data }) => {

    // handler function for clicking load more movies (increment page by 1)
    const handleClick = (event) => {
        event.preventDefault();
        onLoadMore ();
    }

    // create an array containing only necessary movie data
    console.log(data);
    const parsedMovies = parseMovieData(data);
    return (
        <div>
            <div className="movie-card-container">
            {
                // create a new array of MovieCard components
                parsedMovies.map((movie) => {
                    return (
                        // create a movie card component for each movie in array using parsed data
                        <MovieCard key={movie.title} image={movie.image} title={movie.title} rating={movie.rating} />
                    )
                })
            }
            </div>
        <button onClick={handleClick}>Load More</button>
        </div>
    )
}

export default MovieList;