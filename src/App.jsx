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
  
  let MAX_PAGE;

  const createURL = (isSearch, firstLoad) => {
    const apiKey = import.meta.env.VITE_API_KEY;
    const pageNum = firstLoad ? 1 : page;
    if (isSearch) {
      return `${BASE_URL}${SEARCH_REQUEST}?api_key=${apiKey}&query=${searchQuery}&page=${pageNum}`;
    } else {
      return `${BASE_URL}${NOW_PLAYING}?api_key=${apiKey}&page=${pageNum}`;
    }
  };

  const fetchData = async (isSearch, firstLoad) => {
    try {
      const response = await fetch(createURL(isSearch, firstLoad));
      if (!response.ok) {
        throw new Error("Failed to fetch movie data");
      }
      const data = await response.json();
      // set max page
      MAX_PAGE = data.total_pages !== page;
      // console.log("total pages", MAX_PAGE)
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

  // increment page number when load more clicked
  const handleLoadMore = () => {
    setPage((page) => page + 1);
  };

  // handler function to update search query variable
  const handleSearch = (newSearch) => {
    console.log("in handle search");
    setSearchQuery(newSearch);
  };

  // load on mount
  useEffect(() => {
    // reset data to empty
    setMovieData([]);
    // reset to first page
    setPage(1);
    fetchData(PRESENT_NOW_PLAYING, true);
  }, []);

  // if user requests to load more data (page number changes) fetch data
  useEffect(() => {
    if (page > 1) {
      if (searchView === "search") {
        // fetchSearchData();
        fetchData(PRESENT_SEARCH, false);
      } else {
        fetchData(PRESENT_NOW_PLAYING, false);
      }
    }
  }, [page]);

  useEffect(() => {
    if (searchView === "search") {
      fetchData(PRESENT_SEARCH, true);
    }
  }, [searchQuery]);

  // whether we are going to dispaly search results or now playing movies
  const [searchView, setSearchView] = useState("playing");

  // reset page and movie data when view changes
  useEffect(() => {
    console.log("view changed");
    setPage(1);
    setMovieData([]);
  }, [searchView]);

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
      setSearchView(viewRequest);
      // setMovieData([]);
      // setPage(1);
      if (viewRequest === "search") {
        console.log("clicked search");
        setMovieData([]);
      } else {
        console.log("clicked now playing");
        // setPage(1);
        // console.log(page);
        fetchData(PRESENT_NOW_PLAYING, true);
      }
    }
  };


  let searchBar =
    searchView === "search" ? <SearchForm onSearch={handleSearch} /> : <></>;

  return (
    <div className="App">
      <header className="App-header">
        <h1>Flixter</h1>
        {/* <SearchForm onSearch={handleSearch} /> */}
        {/* display search bar only when search view requested */}
        <div>
          <NavBar onViewRequest={handleViewRequest} />
          {searchBar}
        </div>
      </header>
      <main>
        {/* data is the .results (the array of actual movie data) */}
        {/* {console.log(MAX_PAGE)}
        {console.log(page)} */}
        <MovieList onLoadMore={handleLoadMore} data={movieData} morePages={MAX_PAGE} />
      </main>
    </div>
  );
};

export default App;
