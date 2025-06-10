import { useState } from 'react'
import './App.css'
// import MovieCard from './MovieCard';
import MovieList from './MovieList';
import data from './data/data.js';

const App = () => {
  return (
    <div className="App">
      <MovieList movieData={data} />
    </div>
  )
}

export default App
