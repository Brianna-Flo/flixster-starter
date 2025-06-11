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
  const[searchQuery, setSearchQuery] = useState('');
  // get data for now playing movies
  const fetchData = async () => {
    try {
      const apiKey = import.meta.env.VITE_API_KEY;
      const response = await fetch(`${BASE_URL}/movie/now_playing?api_key=${apiKey}&page=${page}`);
      if (!response.ok) {
        throw new Error('Failed to fetch movie data');
      }
      const data = await response.json();
      setMovieData((prev) => {
        return [...prev, ...data.results]
      });
    } catch (error) {
      console.error(error);
    }
  }

  const fetchSearchData = async () => {
    try {
      const apiKey = import.meta.env.VITE_API_KEY;
      const response = await fetch(`${BASE_URL}/search/movie?api_key=${apiKey}&query=${searchQuery}&page=${page}`);
      if (!response.ok) {
        throw new Error('Failed to fetch movie data');
      }
      const data = await response.json();
      // use callback since we know prev is updated, movieData might not be updated yet ASYNC
      setMovieData( (prev) => {
        return [...prev, ...data.results]
      })
    } catch (error) {
      console.error(error);
    }
  }

  // handle load when page increases
  const handleLoadMore = () => {
    // increment page number
    setPage((page) => page + 1);
  }

  // handler function to update search query variable
  const handleSearch = (newSearch) => {
    setSearchQuery(newSearch);
  }

  // if user requests to load more data (page number changes) fetch data
  useEffect(() => {
    if (searchQuery !== '') {
      fetchSearchData();
    } else {
      fetchData();
    }
  }, [page]);

  useEffect(() => {
    if (searchQuery !== '') {
      // reset data to empty
      setMovieData([]);
      // reset to first page 
      setPage(1);
      fetchSearchData();
    }
  }, [searchQuery])

  return (
    <div className="App">
      <header className="App-header">
        <h1>Flixter</h1>
        <SearchForm onSearch={handleSearch}/>
      </header>
      <main>
        {/* data is the .results (the array of actual movie data) */}
        <MovieList onLoadMore={handleLoadMore} data={movieData} />
      </main>
    </div>
  )
}

export default App
