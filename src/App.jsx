import { useState, useEffect } from "react";
import "./App.css";
// import MovieCard from './MovieCard';
import MovieList from "./MovieList";
import SearchForm from "./SearchForm";
import data from "./data/data.js";

const BASE_URL = "https://api.themoviedb.org/3";
const NOW_PLAYING = "/movie/now_playing";
const SEARCH_REQUEST = "/search/movie";
const PRESENT_SEARCH = true;
const PRESENT_NOW_PLAYING = false;

const App = () => {
  // useState function to update movieData variable
  const [movieData, setMovieData] = useState([]);
  // used for load more feature (keep track of page number)
  const [page, setPage] = useState(1);
  // used to hold the entire list of movies
  const [searchQuery, setSearchQuery] = useState("");

  const createURL = (isSearch) => {
    const apiKey = import.meta.env.VITE_API_KEY;
    if (isSearch) {
      return `${BASE_URL}${SEARCH_REQUEST}?api_key=${apiKey}&query=${searchQuery}&page=${page}`;
    } else {
      return `${BASE_URL}${NOW_PLAYING}?api_key=${apiKey}&page=${page}`;
    }
  };

  const fetchData = async (isSearch) => {
    try {
      const response = await fetch(createURL(isSearch));
      if (!response.ok) {
        throw new Error("Failed to fetch movie data");
      }
      const data = await response.json();
      setMovieData((prev) => {
        return [...prev, ...data.results];
      });
    } catch (error) {
      console.error(error);
    }
  };

  // get data for now playing movies
  // const fetchData = async () => {
  //   try {
  //     // const apiKey = import.meta.env.VITE_API_KEY;
  //     // const response = await fetch(`${BASE_URL}${NOW_PLAYING}?api_key=${apiKey}&page=${page}`);
  //     const response = await fetch(createURL(false));
  //     if (!response.ok) {
  //       throw new Error('Failed to fetch movie data');
  //     }
  //     const data = await response.json();
  //     // setMovieData((prev) => {
  //     //   return [...prev, ...data.results]
  //     // });
  //     setMovieData([...movieData, ...data.results]);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  // const fetchSearchData = async () => {
  //   try {
  //     // const apiKey = import.meta.env.VITE_API_KEY;
  //     // const response = await fetch(`${BASE_URL}${SEARCH_REQUEST}?api_key=${apiKey}&query=${searchQuery}&page=${page}`);
  //     const response = await fetch(createURL(true));
  //     if (!response.ok) {
  //       throw new Error('Failed to fetch movie data');
  //     }
  //     const data = await response.json();
  //     // use callback since we know prev is updated, movieData might not be updated yet ASYNC
  //     setMovieData((prev) => {
  //       return [...prev, ...data.results]
  //     })
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  // handle load when page increases
  const handleLoadMore = () => {
    // increment page number
    setPage((page) => page + 1);
  };

  // handler function to update search query variable
  const handleSearch = (newSearch) => {
    setSearchQuery(newSearch);
  };

  // if user requests to load more data (page number changes) fetch data
  useEffect(() => {
    if (searchQuery !== "") {
      // fetchSearchData();
      fetchData(PRESENT_SEARCH);
    } else {
      fetchData(PRESENT_NOW_PLAYING);
    }
  }, [page]);

  useEffect(() => {
    if (searchQuery !== "") {
      // reset data to empty
      setMovieData([]);
      // reset to first page
      setPage(1);
      // fetchSearchData();
      fetchData(PRESENT_SEARCH);
    }
  }, [searchQuery]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Flixter</h1>
        <SearchForm onSearch={handleSearch} />
      </header>
      <main>
        {/* data is the .results (the array of actual movie data) */}
        <MovieList onLoadMore={handleLoadMore} data={movieData} />
      </main>
    </div>
  );
};

export default App;
