import { useState, useEffect } from "react";
import "./App.css";
import MovieList from "./MovieList";
import SearchForm from "./SearchForm";
import NavBar from "./NavBar";
import Modal from "./Modal";
import FilterMenu from "./FilterMenu";
import Footer from "./Footer";

const BASE_URL = "https://api.themoviedb.org/3";
const NOW_PLAYING = "/movie/now_playing";
const SEARCH_REQUEST = "/search/movie";
const API_KEY = import.meta.env.VITE_API_KEY;
const PRESENT_SEARCH = true;
const PRESENT_NOW_PLAYING = false;
const FIRST_LOAD = true;
const LOAD_MORE = false;

const App = () => {
  // useState function to update movieData variable
  const [movieData, setMovieData] = useState([]);
  // used for load more feature (keep track of page number)
  const [page, setPage] = useState(1);
  // used to hold the entire list of movies
  const [searchQuery, setSearchQuery] = useState("");
  // whether we are going to dispaly search results or now playing movies
  const [searchView, setSearchView] = useState("playing");
  // keep track of total pages
  const [maxPages, setMaxPages] = useState(1);
  // keep track of whether modal is open or not
  const [modalOpen, setModalOpen] = useState(false);
  // hold the data for the modal that is open
  const [modalData, setModalData] = useState({});
  // hold array of genre data
  const [genreData, setGenreData] = useState([]);

  // creates a url to fetch from dependent on if searching or not
  const createURL = (isSearch, firstLoad) => {
    const pageNum = firstLoad ? 1 : page;
    if (isSearch) {
      return `${BASE_URL}${SEARCH_REQUEST}?api_key=${API_KEY}&query=${searchQuery}&page=${pageNum}`;
    } else {
      return `${BASE_URL}${NOW_PLAYING}?api_key=${API_KEY}&page=${pageNum}`;
    }
  };

  // done at load, fetch genre array from API
  const fetchGenres = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch genre data");
      }
      const data = await response.json();
      setGenreData(data.genres);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchData = async (isSearch, firstLoad) => {
    try {
      const created_url = createURL(isSearch, firstLoad);
      const response = await fetch(created_url);
      if (!response.ok) {
        throw new Error("Failed to fetch movie data");
      }
      const data = await response.json();
      if (firstLoad) {
        setMaxPages(data.total_pages);
        // console.log('setting max pages', maxPages)
      }
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
    setSearchQuery(newSearch);
  };

  // handler function to update the search view to playing and load now playing cards
  const handleClear = () => {
    setSearchView('playing');
    fetchData(PRESENT_NOW_PLAYING, FIRST_LOAD);
  };

  // load on mount
  useEffect(() => {
    // reset data to empty
    setMovieData([]);
    // reset to first page
    setPage(1);
    fetchGenres();
    fetchData(PRESENT_NOW_PLAYING, FIRST_LOAD);
  }, []);

  // if user requests to load more data (page number changes) fetch data
  useEffect(() => {
    if (page > 1) {
      if (searchView === "search") { // load pages in search view
        fetchData(PRESENT_SEARCH, LOAD_MORE);
      } else { // load another page from now playing
        fetchData(PRESENT_NOW_PLAYING, LOAD_MORE);
      }
    }
  }, [page]);

  useEffect(() => {
    if (searchView === "search") {
      fetchData(PRESENT_SEARCH, FIRST_LOAD);
    }
  }, [searchQuery]);

  // reset page and movie data when view changes
  useEffect(() => {
    setPage(1);
    setMovieData([]);
    if (searchView === "playing") {
      fetchData(PRESENT_NOW_PLAYING, FIRST_LOAD);
    }
  }, [searchView]);


  const handleViewRequest = (viewRequest) => {
    if (viewRequest !== searchView) {
      setSearchView(viewRequest);
    }
  };

  // open the modal
  const handleOpenModal = () => {
    setModalOpen(true);
  };

  // close the modal
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  // handle modal presented on screen
  const handleLoadModal = (newData) => {
    setModalData(newData);
  };

  // when modal data changes, load runtime details
  useEffect(() => {
    if(modalData.id && modalData.runtime === '') {
      extractRuntime(modalData.id);
    }
  }, [modalData])

  const extractRuntime = async (movie_id) => {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=${API_KEY}`);
        if (!response.ok) {
        throw new Error("Failed to fetch movie details");
        }
        const data = await response.json();
        const runtime = data.runtime;
        setModalData((prev) => ({
          ...prev,
          runtime
        }));
    } catch (error) {
        console.error(error);
    }
  }

  const handleFilterRequest = (newData) => {
    setMovieData([...newData])
  };



  let searchBar =
    searchView === "search" ? <SearchForm onSearch={handleSearch} onClear={handleClear}/> : <></>;

  return (
    <div className="App">
      <banner>
        <h1>Flixter</h1>
      </banner>
      <header className="App-header">
        {/* <h1>Flixter</h1> */}
        {/* display search bar only when search view requested */}
          <FilterMenu onFilter={handleFilterRequest} movieData={movieData}/>
          <div id="nav-bar">
            <NavBar onViewRequest={handleViewRequest} />
            {searchBar}
          </div>
      </header>
      <main>
        {/* data is the .results (the array of actual movie data) */}
        <MovieList
          onLoadMore={handleLoadMore}
          data={movieData}
          morePages={maxPages !== page}
          onOpenModal={handleOpenModal}
          onLoadModal={handleLoadModal}
          genreData={genreData}
        />
        {modalOpen && (
          <Modal onCloseModal={handleCloseModal} modalData={modalData} />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default App;
