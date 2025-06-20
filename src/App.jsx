import { useState, useEffect } from "react";
import "./App.css";
import MovieList from "./MovieList";
import SearchForm from "./SearchForm";
import NavBar from "./NavBar";
import Modal from "./Modal";
import FilterMenu from "./FilterMenu";
import Footer from "./Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTicket } from "@fortawesome/free-solid-svg-icons";

const BASE_URL = "https://api.themoviedb.org/3";
const NOW_PLAYING = "/movie/now_playing";
const SEARCH_REQUEST = "/search/movie";
const API_KEY = import.meta.env.VITE_API_KEY;
const PRESENT_SEARCH = true;
const PRESENT_NOW_PLAYING = false;
const FIRST_LOAD = true;
const LOAD_MORE = false;

const App = () => {
  const [movieData, setMovieData] = useState([]);
  // used for load more feature (keep track of page number)
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [view, setView] = useState("playing");
  // keep track of total pages for loadmore button display
  const [maxPages, setMaxPages] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const [genreData, setGenreData] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [watchedMovies, setWatchedMovies] = useState([]);
  const [fetchingData, setFetchingData] = useState(false);
  const [toggleNav, setToggleNav] = useState(false);

  // load on mount
  useEffect(() => {
    setMovieData([]);
    setPage(1);
    fetchGenres();
    fetchData(PRESENT_NOW_PLAYING, FIRST_LOAD);
  }, []);

  // if user requests to load more data (page number changes) fetch data
  useEffect(() => {
    if (page > 1) {
      if (view === "search") {
        // load pages in search view
        fetchData(PRESENT_SEARCH, LOAD_MORE);
      } else if (view === "playing") {
        // load another page from now playing
        fetchData(PRESENT_NOW_PLAYING, LOAD_MORE);
      }
    }
  }, [page]);

  // reset page and movie data when view changes
  useEffect(() => {
    setPage(1);
    if (view === "playing") {
      fetchData(PRESENT_NOW_PLAYING, FIRST_LOAD);
    } else if (view === "favorites") {
      setMovieData(favoriteMovies);
      setFetchingData(false);
    } else if (view === "watched") {
      setMovieData(watchedMovies);
      setFetchingData(false);
    } else if (view === "search") {
      fetchData(PRESENT_SEARCH, FIRST_LOAD);
    }
  }, [view, searchQuery]);

  // when modal is opened, modal data changes and fetch runtime and trailer
  useEffect(() => {
    if (modalData.id && modalData.runtime === "") {
      extractRuntime(modalData.id);
    }
    if (modalData.id && modalData.trailer === "") {
      extractTrailer(modalData.id);
    }
  }, [modalData]);

  // creates a url to fetch from dependent on if searching or not
  const createURL = (isSearch, firstLoad) => {
    const pageNum = firstLoad ? 1 : page;
    if (isSearch) {
      return `${BASE_URL}${SEARCH_REQUEST}?api_key=${API_KEY}&query=${searchQuery}&page=${pageNum}`;
    } else {
      return `${BASE_URL}${NOW_PLAYING}?api_key=${API_KEY}&page=${pageNum}`;
    }
  };

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
      }
      setFetchingData(true);
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

  const extractRuntime = async (movie_id) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${API_KEY}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch movie details");
      }
      const data = await response.json();
      const runtime = data.runtime;
      setModalData((prev) => ({
        ...prev,
        runtime: runtime,
      }));
    } catch (error) {
      console.error(error);
    }
  };

  const extractTrailer = async (movie_id) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movie_id}/videos?api_key=${API_KEY}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch movie trailer");
      }
      const data = await response.json();
      const official = data.results.filter((video) => video.type === "Trailer");
      const trailer = `https://www.youtube.com/embed/${official[0].key}`;
      setModalData((prev) => ({
        ...prev,
        trailer: trailer,
      }));
    } catch (error) {
      console.error(error);
    }
  };

  const handleFavoriteMovie = (favorite, movie) => {
    if (favorite) {
      setFavoriteMovies((prev) => {
        if (favorite && !prev.some((curr) => curr.id === movie.id)) {
          return [...prev, movie];
        } else {
          return prev;
        }
      });
    } else {
      setFavoriteMovies(
        favoriteMovies.filter((curr) => {
          return curr.id !== movie.id;
        })
      );
    }
  };

  const handleWatchedMovie = (watch, movie) => {
    if (watch) {
      setWatchedMovies((prev) => {
        if (watch && !prev.some((curr) => curr.id === movie.id)) {
          return [...prev, movie];
        } else {
          return prev;
        }
      });
    } else {
      setWatchedMovies(
        watchedMovies.filter((curr) => {
          return curr.id !== movie.id;
        })
      );
    }
  };

  const handleFilterRequest = (newData) => {
    setMovieData([...newData]);
  };

  const handleViewRequest = (viewRequest) => {
    setView(viewRequest);
  };

  const toggleModal = () => {
    setModalOpen((prev) => {
      if (!prev) {
        document.querySelector("body").className = "opened";
      } else {
        document.querySelector("body").className = "";
      }
      return !prev;
    });
  };

  const handleToggleNav = () => {
    setToggleNav((prev) => !prev);
  };

  // handle modal presented on screen
  const handleLoadModal = (newData) => {
    setModalData(newData);
  };

  // increment page number when load more clicked
  const handleLoadMore = () => {
    setPage((page) => page + 1);
  };

  // handler function to update search query variable
  const handleSearch = (newSearch) => {
    setSearchQuery(newSearch);
    setView("search");
  };

  // handler function to update the search view to playing and load now playing cards
  const handleClear = () => {
    setView("playing");
    fetchData(PRESENT_NOW_PLAYING, FIRST_LOAD);
  };

  return (
    <div className="App">
      <section id="banner">
        <h1>
          <FontAwesomeIcon icon={faTicket} className="gold" /> Flixter{" "}
          <FontAwesomeIcon icon={faTicket} className="gold" />
        </h1>
      </section>
      <header className="App-header">
        <FilterMenu onFilter={handleFilterRequest} movieData={movieData} />
        <div id="nav-bar">
          <FontAwesomeIcon
            icon={faBars}
            className="nav-icon"
            onClick={handleToggleNav}
          />
          {toggleNav && (
            <NavBar
              onViewRequest={handleViewRequest}
              onCloseNav={handleToggleNav}
            />
          )}
          <SearchForm onSearch={handleSearch} onClear={handleClear} />
        </div>
      </header>
      <main>
        <MovieList
          onLoadMore={handleLoadMore}
          data={movieData}
          morePages={maxPages > page}
          onOpenModal={toggleModal}
          onLoadModal={handleLoadModal}
          genreData={genreData}
          onFavorite={handleFavoriteMovie}
          onWatch={handleWatchedMovie}
          fetching={fetchingData}
          favoriteMovies={favoriteMovies}
          watchedMovies={watchedMovies}
          view={view}
        />
        {modalOpen && (
          <Modal onCloseModal={toggleModal} modalData={modalData} />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default App;
