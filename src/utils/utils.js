// data is an array of movies
const parseMovieData = (movieData) => {
    return movieData.map(movie => ({
        title: movie.original_title,
        rating: movie.vote_average,
        image: movie.poster_path
    }));
}

export { parseMovieData };