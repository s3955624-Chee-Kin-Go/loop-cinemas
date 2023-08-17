import React from 'react';
import './pagesCSS/Home.css';
import MovieCard from './pageResources/MovieCard';
import AboutUs from './pageResources/AboutUs'
import { getMovies } from '../data/repository';


function Home() {
  // Get movies array from local storage
  const movies = getMovies();

  return (
    <>
    <h1 className='section-title'>Coming Soon</h1>
    <section className="movie-section">
      <div className='movie-row'>
        {/*Display all movies*/}
        {
          movies.map((movie) =>
            <div className='movie-column'>
              <MovieCard
              imageUrl={movie.imageURL[0]}
              title={movie.title}
              text="Click to view session time"
              averageRating = {movie.averageRating}
              type="movie"
              sessionTime={movie.sessionTime}/>
            </div>
          )
        }
      </div>
    </section>

    {/* Display About Us component */}
    <AboutUs />
    
    </>
  );
}

export default Home;