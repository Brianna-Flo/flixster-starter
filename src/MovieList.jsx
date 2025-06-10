import React from 'react';
import './MovieList.css'
import MovieCard from './MovieCard';

import { parseMovieData } from './utils/utils'

// const MovieList = ({ onLoadMore, data }) => {
const MovieList = (props) => {

    // handler function for clicking load more button
    // const handleClick = (event) => {
    //     event.preventDefault();
    //     fetchData(page)
    // }

    // create an array containing only necessary movie data
    console.log(props.data);
    const parsedMovies = parseMovieData(props.data.results);
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
        {/* <button onClick={handleLoadMore}>Load More</button> */}
        </div>
    )
}

export default MovieList;