// data is an array of movies
const parseMovieData = (movieData, genreData) => {
    return movieData.map(movie => ({
        title: movie.title,
        rating: movie.vote_average,
        image: movie.poster_path,
        id: movie.id,
        releaseDate: movie.release_date,
        overview: movie.overview,
        genres: extractGenres(movie, genreData),
        backdrop: movie.backdrop_path,
        // runtime: extractRuntime(movie.id),
        runtime: '',
    }));
}

// return an array of genres for a single movie
const extractGenres = (movieData, genreData) => {
    const movieGenreIds = movieData.genre_ids;
    return movieGenreIds.map(genre_id => (genreData.find((genre) => genre.id === genre_id).name));
}

// const extractRuntime = async (movie_id) => {
//     try {
//         const apiKey = import.meta.env.VITE_API_KEY;
//         const response = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=${apiKey}`);
//         if (!response.ok) {
//         throw new Error("Failed to fetch movie details");
//         }
//         const data = await response.json();
//         console.log(data);
//         console.log(data.runtime);
//         return data.runtime;
//     } catch (error) {
//         console.error(error);
//     }
// }

export { parseMovieData };