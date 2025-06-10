import { useState, useEffect } from 'react'
import './App.css'
// import MovieCard from './MovieCard';
import MovieList from './MovieList';
import SearchForm from './SearchForm';
import data from './data/data.js';

const App = () => {
  // useEffect(() => {
  //   // set new state to old todos + new todos
  //   const fetchData = async () => {
  //     try {
  //       const apiKey = import.meta.env.VITE_APP_API_KEY;
  //       const response = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_release_type=2|3&release_date.gte={min_date}&release_date.lte={max_date}`);
  //       if (!response.ok) {
  //         throw new Error('Failed to fetch movie data');
  //       }
  //       const data = await response.json();
  //       setMovieData(data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  //   fetchData()
  // })
  const BASE_URL = 'https://api.themoviedb.org/3';

  // useState function to update movieData variable
  const[movieData, setMovieData] = useState(data);
  // used for load more feature (keep track of page number)
  const[page, setPage] = useState(1);

  // get data for now playing movies
  const fetchData = async (page) => {
    try {
      const apiKey = import.meta.env.VITE_API_KEY;
      // const response = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_release_type=2|3&release_date.gte=${min_date}&release_date.lte=${max_date}`, options);
      const response = await fetch(`${BASE_URL}/movie/now_playing?api_key=${apiKey}&language=en-US&page=${page}`);
      if (!response.ok) {
        throw new Error('Failed to fetch movie data');
      }
      const data = await response.json();
      setMovieData(data);
    } catch (error) {
      console.error(error);
    }
  }

  // // handle load when page increases
  // const handleLoadMore = () => {
  //   // increment page number
  //   setPage((page) => page + 1);
  // }

  useEffect(() => {
    console.log("in fetch data");
    fetchData();
  }, []);

  // // if user requests to load more data (page number changes) fetch data
  // useEffect(() => {
  //   if (page) {
  //     fetchData(page);
  //   }
  // }, [page]);


  return (
    <div className="App">
      <header className="App-header">
        <h1>Flixter</h1>
        <SearchForm />
      </header>
      <main>
        {/* <MovieList onLoadMore={handleLoadMore} data={movieData} /> */}
        <MovieList data={movieData} />
      </main>
    </div>
  )
}

export default App
