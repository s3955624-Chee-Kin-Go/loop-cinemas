import React, { useState } from "react";
import "./pagesCSS/Forum.css"
import { useNavigate } from "react-router-dom";
import MovieCard from './pageResources/MovieCard';

// NOTE: The posts are not persistent and will be lost when the component unmounts.
// Could store the posts in localStorage, within the parent component, in a context, etc...
function Forum(props) {
  const navigate = useNavigate();
  const [post, setPost] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [posts, setPosts] = useState([]); // FIX THIS TO COMMUNICATE WITH DATABASE

  const handleInputChange = (event) => {
    setPost(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    // Trim the post text.
    const postTrimmed = post.trim();

    if(postTrimmed === "") {
      setErrorMessage("A post cannot be empty.");
      return;
    }

    // Create post.
    setPosts([ ...posts, { username: props.username, text: postTrimmed}]);

    // Reset post content.
    setPost("");
    setErrorMessage("");
    {/*
    navigate("/forum");
    navigate(0)
    */}
  }

  return (
    <>
    <h1 className="section-title">Forum</h1>
    <section className="movie-section">
        <div className='movie-row'>
          <div className='movie-column'>
            <MovieCard
            imageUrl="https://cdn.palacecinemas.com.au/CDN/Image/Entity/FilmPosterGraphic/HO00016663"
            title="Barbie"
            text="Click to leave a review"
            handleReviewSubmit={handleSubmit}
            handleInputChange={handleInputChange}
            errorMessage={errorMessage}
            post={post}
            />
          </div>
          <div className='movie-column'>
            <MovieCard
            imageUrl="https://cdn.palacecinemas.com.au/CDN/Image/Entity/FilmPosterGraphic/HO00016619"
            title="Oppenheimer"
            text="Click to leave a review"
            handleReviewSubmit={handleSubmit}
            handleInputChange={handleInputChange}
            errorMessage={errorMessage}
            post={post}/>
          </div>
          <div className='movie-column'>
          <MovieCard
            imageUrl="https://poster.gsc.com.my/2023/230315_MissionImpossible-DeadReckoningPartOne_big.jpg"
            title="Mission: Impossible - Dead Reckoning Part 1"
            text="Click to leave a review"
            handleReviewSubmit={handleSubmit}
            handleInputChange={handleInputChange}
            errorMessage={errorMessage}
            post={post}/>
          </div>
          <div className='movie-column'>
          <MovieCard
            imageUrl="https://poster.gsc.com.my/2023/230714_TheMoon_big.jpg"
            title="The Moon"
            text="Click to leave a review"
            handleReviewSubmit={handleSubmit}
            handleInputChange={handleInputChange}
            errorMessage={errorMessage}
            post={post}/>
          </div>
          <div className='movie-column'>
            <MovieCard
            imageUrl="https://poster.gsc.com.my/2023/230307_TheMarvels_big.jpg"
            title="The Marvels"
            text="Click to leave a review"
            handleReviewSubmit={handleSubmit}
            handleInputChange={handleInputChange}
            errorMessage={errorMessage}
            post={post}/>
          </div>
          <div className='movie-column'>
            <MovieCard
            imageUrl="https://poster.gsc.com.my/2023/230713_Wonka_big.jpg"
            title="Wonka"
            text="Click to leave a review"
            handleReviewSubmit={handleSubmit}
            handleInputChange={handleInputChange}
            errorMessage={errorMessage}
            post={post}/>
          </div>
          <div className='movie-column'>
          <MovieCard
            imageUrl="https://poster.gsc.com.my/2023/230714_ConcreteUtopia_big.jpg"
            title="Concrete Utopia"
            text="Click to leave a review"
            handleReviewSubmit={handleSubmit}
            handleInputChange={handleInputChange}
            errorMessage={errorMessage}
            post={post}/>
          </div>
          <div className='movie-column'>
          <MovieCard
            imageUrl="https://poster.gsc.com.my/2023/230504_DunePartTwo_big.jpg"
            title="Dune Part Two"
            text="Click to leave a review"
            handleReviewSubmit={handleSubmit}
            handleInputChange={handleInputChange}
            errorMessage={errorMessage}
            post={post}/>
          </div>
        </div>
      </section>
      <div className="content">
        <h1>Forum</h1>
        <div>
          {
            posts.length === 0 ?
              <span style={{color: "white"}}>No posts have been submitted.</span>
              :
              posts.map((x) =>
                <div className="post">
                  <h3 style={{color: "red"}}>{x.username}</h3>
                  <p style={{color: "white"}}>{x.text}</p>
                  <p style={{color: "white"}}>{x.starRating}</p>
                </div>
              )
          }
        </div>
      </div>
    </>
  );
}

export default Forum;