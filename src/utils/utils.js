// data is an array of movies
const parseMovieData = (movieData, genreData) => {
    return movieData.map(movie => ({
        title: movie.title,
        rating: movie.vote_average,
        image: movie.poster_path,
        id: movie.id,
        releaseDate: movie.release_date,
        overview: movie.overview,
        // genres: movie.genre_ids,
        genres: extractGenres(movie, genreData),
        backdrop: movie.backdrop_path,
    }));
}

// return an array of genres for a single movie
const extractGenres = (movieData, genreData) => {
    const movieGenreIds = movieData.genre_ids;
    return movieGenreIds.map(genre_id => (genreData.find((genre) => genre.id === genre_id).name));
}


export { parseMovieData };