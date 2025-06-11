// data is an array of movies
const parseMovieData = (movieData) => {
    return movieData.map(movie => ({
        title: movie.title,
        rating: movie.vote_average,
        image: movie.poster_path,
        id: movie.id,
        releaseDate: movie.release_date,
        overview: movie.overview,
        genres: movie.genre_ids,
    }));
}

export { parseMovieData };