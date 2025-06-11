import React from 'react';
import './MovieList.css'
import MovieCard from './MovieCard';

import { parseMovieData } from './utils/utils'

const MovieList = ({ onLoadMore, data, morePages }) => {
    console.log("more pages", morePages)
    if (data.length === 0) {
        return <p>No search matches ;-;</p>
    }
    // handler function for clicking load more movies (increment page by 1)
    const handleClick = (event) => {
        event.preventDefault();
        onLoadMore ();
    }

    // create an array containing only necessary movie data
    const parsedMovies = parseMovieData(data);
    // create an array filtering out movies with null images
    const filteredMovies = parsedMovies.filter((movie) => movie.image !== null);
    console.log(filteredMovies);
    // display button only if there are more pages to load
    // let content = <></>;
    // if (morePages) {
    //     console.log("load more button")
    //     content = <button onClick={handleClick}>Load More</button>;
    // }
    return (
        <div>
            <div className="movie-card-container">
            {
                // create a new array of MovieCard components
                filteredMovies.map((movie) => {
                    return (
                        // create a movie card component for each movie in array using parsed data
                        <MovieCard key={movie.id} image={movie.image} title={movie.title} rating={movie.rating} />
                    )
                })
            }
            </div>
        
        <button onClick={handleClick}>Load More</button>
        {/* {content} */}
        </div>
    )
}

export default MovieList;