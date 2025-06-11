import { useState, useEffect } from "react";
import "./App.css";
// import MovieCard from './MovieCard';
import MovieList from "./MovieList";
import SearchForm from "./SearchForm";
import data from "./data/data.js";
import NavBar from "./NavBar";

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

  const fetchData = async (isSearch, firstLoad) => {
    try {
      const response = await fetch(createURL(isSearch));
      if (!response.ok) {
        throw new Error("Failed to fetch movie data");
      }
      const data = await response.json();
      setMovieData((prev) => {
        if (firstLoad) {
          return data.results;
        } else {
          return [...prev, ...data.results];
        }
      });
    } catch (error) {
      console.error(error);
    }
  };
  // handle load when page increases
  const handleLoadMore = () => {
    // increment page number
    setPage((page) => page + 1);
  };

  // handler function to update search query variable
  const handleSearch = (newSearch) => {
    setSearchQuery(newSearch);
  };

  // // load on mount
  // useEffect(() => {
  //   fetchData(PRESENT_NOW_PLAYING, true);
  // }, []);

  // if user requests to load more data (page number changes) fetch data
  useEffect(() => {
    // if (searchQuery !== "") {
    if (searchView === 'true') {
      // fetchSearchData();
      fetchData(PRESENT_SEARCH, false);
    } else {
      fetchData(PRESENT_NOW_PLAYING, false);
    }
  }, [page]);

  useEffect(() => {
    // if (searchQuery !== "") {
    if (searchView === 'true') {
      // reset data to empty
      setMovieData([]);
      // reset to first page
      setPage(1);
      // fetchSearchData();
      fetchData(PRESENT_SEARCH, true);
    }
  }, [searchQuery]);


    // whether we are going to dispaly search results or now playing movies
    const[searchView, setSearchView] = useState('false');
    // let searchBar = <></>;

    const handleViewRequest = (viewRequest) => {
      // reset page when we change views
      // setMovieData([]);
      // setPage(1);
      // if (viewRequest) { // if we are in search mode
      //   searchBar = <SearchForm onSearch={handleSearch} />;
      // } else {
      //   searchBar =  <></>;
      //   fetchData(PRESENT_NOW_PLAYING, true);
      // }
      if (viewRequest !== searchView) {
        setSearchView (viewRequest);
        setPage(1);
        if (viewRequest === 'true') {
          console.log('clicked search')
          setMovieData([]);
        } else {
          console.log('clicked now playing')
          fetchData(PRESENT_NOW_PLAYING, true);
        }
      }
    }
    let searchBar = searchView === 'true' ? <SearchForm onSearch={handleSearch} /> : <></>


  return (
    <div className="App">
      <header className="App-header">
        <h1>Flixter</h1>
        {/* <SearchForm onSearch={handleSearch} /> */}
        {/* display search bar only when search view requested */}
        {searchBar}
        <NavBar onViewRequest={handleViewRequest}/>
      </header>
      <main>
        {/* data is the .results (the array of actual movie data) */}
        <MovieList onLoadMore={handleLoadMore} data={movieData} />
      </main>
    </div>
  );
};

export default App;
