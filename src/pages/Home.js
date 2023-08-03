import React from 'react';
import logo from "../logo.svg";
import MovieCard from './pageResources/MovieCard';
import './pageCSS/Home.css';

function Home() {
  return (
    <section className="movie-section">
      <div className='movie-row'>
        <div className='movie-column'>
          <MovieCard
          imageUrl="https://cdn.palacecinemas.com.au/CDN/Image/Entity/FilmPosterGraphic/HO00016663"
          title="Barbie"
          text="Movie"/>
        </div>
        <div className='movie-column'>
          <MovieCard
          imageUrl="https://cdn.palacecinemas.com.au/CDN/Image/Entity/FilmPosterGraphic/HO00016619"
          title="Oppenheimer"
          text="Movie"/>
        </div>
        <div className='movie-column'>
        <MovieCard
          imageUrl="https://poster.gsc.com.my/2023/230315_MissionImpossible-DeadReckoningPartOne_big.jpg"
          title="Mission: Impossible - Dead Reckoning Part 1"
          text="Movie"/>
        </div>
        <div className='movie-column'>
        <MovieCard
          imageUrl="https://poster.gsc.com.my/2023/230714_TheMoon_big.jpg"
          title="The Moon"
          text="Movie"/>
        </div>
      </div>
    </section>
  );
}

export default Home;