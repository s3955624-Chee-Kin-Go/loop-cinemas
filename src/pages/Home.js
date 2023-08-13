import React from 'react';
import './pagesCSS/Home.css';
import MovieCard from './pageResources/MovieCard';
import AboutUs from './pageResources/AboutUs'

function Home() {
  return (
    <>
    <h1 className='section-title'>Coming Soon</h1>
    <section className="movie-section">
      <div className='movie-row'>
        <div className='movie-column'>
          <MovieCard
          imageUrl="https://cdn.palacecinemas.com.au/CDN/Image/Entity/FilmPosterGraphic/HO00016663"
          title="Barbie"
          text="Click to view session time"
          type="movie"/>
        </div>
        <div className='movie-column'>
          <MovieCard
          imageUrl="https://cdn.palacecinemas.com.au/CDN/Image/Entity/FilmPosterGraphic/HO00016619"
          title="Oppenheimer"
          text="Click to view session time"
          type="movie"/>
        </div>
        <div className='movie-column'>
        <MovieCard
          imageUrl="https://poster.gsc.com.my/2023/230315_MissionImpossible-DeadReckoningPartOne_big.jpg"
          title="Mission: Impossible - Dead Reckoning Part 1"
          text="Click to view session time"/>
        </div>
        <div className='movie-column'>
        <MovieCard
          imageUrl="https://poster.gsc.com.my/2023/230714_TheMoon_big.jpg"
          title="The Moon"
          text="Click to view session time"/>
        </div>
        <div className='movie-column'>
          <MovieCard
          imageUrl="https://poster.gsc.com.my/2023/230307_TheMarvels_big.jpg"
          title="The Marvels"
          text="Click to view session time"/>
        </div>
        <div className='movie-column'>
          <MovieCard
          imageUrl="https://poster.gsc.com.my/2023/230713_Wonka_big.jpg"
          title="Wonka"
          text="Click to view session time"/>
        </div>
        <div className='movie-column'>
        <MovieCard
          imageUrl="https://poster.gsc.com.my/2023/230714_ConcreteUtopia_big.jpg"
          title="Concrete Utopia"
          text="Click to view session time"/>
        </div>
        <div className='movie-column'>
        <MovieCard
          imageUrl="https://poster.gsc.com.my/2023/230504_DunePartTwo_big.jpg"
          title="Dune Part Two"
          text="Click to view session time"/>
        </div>
      </div>
    </section>

    <AboutUs />
    
    </>
  );
}

export default Home;