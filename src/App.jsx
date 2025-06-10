import { useState } from 'react'
import './App.css'
// import MovieCard from './MovieCard';
import MovieList from './MovieList';
import data from './data/data.js';

const App = () => {
  return (
    <div className="App">
      <header>
        <h1>Flixter</h1>
        <p>insert nav bar component with search and sort</p>
      </header>
      <main>
        <MovieList data={data} />
      </main>
    </div>
  )
}

export default App
