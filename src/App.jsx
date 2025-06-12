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
const FILTER_REQUEST = "/discover/movie";
const PRESENT_SEARCH = true;
const PRESENT_NOW_PLAYING = false;
const firstLoad = true;
const loadMore = false;

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
  // the current filter to present, holds a function to sort movieData with
  const [filter, setFilter] = useState(false);

  const createURL = (isSearch, firstLoad) => {
    const apiKey = import.meta.env.VITE_API_KEY;
    const pageNum = firstLoad ? 1 : page;
    if (isSearch) {
      return `${BASE_URL}${SEARCH_REQUEST}?api_key=${apiKey}&query=${searchQuery}&page=${pageNum}`;
    // } else if (newFilter !== "") {
    //   console.log("creating filter url for ", filter);
    //   return `${BASE_URL}${FILTER_REQUEST}?api_key=${apiKey}&sort_by=${filter}&page=${pageNum}`;
    } else {
      return `${BASE_URL}${NOW_PLAYING}?api_key=${apiKey}&page=${pageNum}`;
    }
  };

  const fetchGenres = async () => {
    try {
      const apiKey = import.meta.env.VITE_API_KEY;
      const response = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`
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
      console.log("url is ", created_url);
      const response = await fetch(created_url);
      if (!response.ok) {
        throw new Error("Failed to fetch movie data");
      }
      const data = await response.json();
      if (firstLoad) {
        setMaxPages(data.total_pages);
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
    // console.log("in handle search");
    setSearchQuery(newSearch);
  };

  // load on mount
  useEffect(() => {
    // reset data to empty
    setMovieData([]);
    // reset to first page
    setPage(1);
    fetchGenres();
    fetchData(PRESENT_NOW_PLAYING, firstLoad);
  }, []);

  // if user requests to load more data (page number changes) fetch data
  useEffect(() => {
    console.log("in load more");
    if (page > 1) {
      if (searchView === "search") { // load pages in search view
        console.log("in search more");
        // fetchSearchData();
        fetchData(PRESENT_SEARCH, loadMore);
      } else if (filter !== "") { // load another page for filter
        console.log("filter is ", filter);
        console.log("in filter more");
        fetchData(false, loadMore);
      } else { // load another page from now playing
        console.log("in now playing more");
        fetchData(PRESENT_NOW_PLAYING, loadMore);
      }
    }
  }, [page]);

  useEffect(() => {
    if (searchView === "search") {
      fetchData(PRESENT_SEARCH, firstLoad);
    }
  }, [searchQuery]);

  // reset page and movie data when view changes
  useEffect(() => {
    console.log("view changed");
    setPage(1);
    setMovieData([]);
  }, [searchView]);


  const handleViewRequest = (viewRequest) => {
    if (viewRequest !== searchView) {
      setSearchView(viewRequest);
      if (viewRequest === "search") {
        console.log("clicked search");
      } else {
        console.log("clicked now playing");
        fetchData(PRESENT_NOW_PLAYING, firstLoad);
      }
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

  // when modal data changes, load details like the runtime
  useEffect(() => {
    if(modalData.id && modalData.runtime === '') {
      extractRuntime(modalData.id);
    }
  }, [modalData])

  const extractRuntime = async (movie_id) => {
    try {
        const apiKey = import.meta.env.VITE_API_KEY;
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=${apiKey}`);
        if (!response.ok) {
        throw new Error("Failed to fetch movie details");
        }
        const data = await response.json();
        console.log(data);
        console.log(data.runtime);
        const runtime = data.runtime;
        setModalData((prev) => ({
          ...prev,
          runtime
        }));
    } catch (error) {
        console.error(error);
    }
  }

  // handle change to filter
  // const handleFilterRequest = (newFilter) => {
  //   setFilter(newFilter);
    
  //   // movieData.sort(filter);
  // };
  const handleFilterRequest = (newData) => {
    console.log(newData);
    setMovieData(newData);
    setFilter((filter) => !filter);
  };

  useEffect (() => {    

  }, [filter]);

  let searchBar =
    searchView === "search" ? <SearchForm onSearch={handleSearch} /> : <></>;

  return (
    <div className="App">
      <header className="App-header">
        <h1>Flixter</h1>
        {/* display search bar only when search view requested */}
        <div>
          <FilterMenu onFilter={handleFilterRequest} movieData={movieData}/>
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
