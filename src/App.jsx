import { useState, useEffect } from 'react'
import './App.css'
// import MovieCard from './MovieCard';
import MovieList from './MovieList';
import SearchForm from './SearchForm';
import data from './data/data.js';

const App = () => {
  const BASE_URL = 'https://api.themoviedb.org/3';

  // useState function to update movieData variable
  const[movieData, setMovieData] = useState([]);
  // used for load more feature (keep track of page number)
  const[page, setPage] = useState(1);
  // used to hold the entire list of movies
  // const[loadedList, setLoadedList] = useState([]);

  // get data for now playing movies
  const fetchData = async () => {
    try {
      const apiKey = import.meta.env.VITE_API_KEY;
      // const response = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_release_type=2|3&release_date.gte=${min_date}&release_date.lte=${max_date}`, options);
      console.log(`page number is ${page}`)
      const response = await fetch(`${BASE_URL}/movie/now_playing?api_key=${apiKey}&language=en-US&page=${page}`);
      if (!response.ok) {
        throw new Error('Failed to fetch movie data');
      }
      const data = await response.json();
      // setMovieData(data);
      setMovieData([...movieData, ...data.results]);
      // setMovieData((currMovieData) => [...currMovieData, ...data]);
    } catch (error) {
      console.error(error);
    }
  }

  // handle load when page increases
  const handleLoadMore = () => {
    // increment page number
    setPage((page) => page + 1);
  }

  // useEffect(() => {
  //   fetchData();
  // }, []);

  // if user requests to load more data (page number changes) fetch data
  useEffect(() => {
    console.log("in use effect");
    fetchData();
  }, [page]);


  return (
    <div className="App">
      <header className="App-header">
        <h1>Flixter</h1>
        <SearchForm />
      </header>
      <main>
        {/* data is the .results (the array of actual movie data) */}
        <MovieList onLoadMore={handleLoadMore} data={movieData} />
      </main>
    </div>
  )
}

export default App
