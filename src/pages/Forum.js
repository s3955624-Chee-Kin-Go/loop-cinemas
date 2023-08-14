import React, { useState, useEffect } from "react";
import "./pagesCSS/Forum.css"
import { useNavigate } from "react-router-dom";
import MovieCard from './pageResources/MovieCard';
import { initReviews, addNewReview, getReviews, deleteReview} from "../data/repository";
import { MDBIcon, MDBBtn } from 'mdb-react-ui-kit';

// NOTE: The posts are not persistent and will be lost when the component unmounts.
// Could store the posts in localStorage, within the parent component, in a context, etc...
function Forum(props) {
  const navigate = useNavigate();
  const [post, setPost] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [posts, setPosts] = useState([]); // Store posts in state

  // Implement remove user functionality
  const handleRemovePost = (event, title, rating, postTrimmed) => {
    event.preventDefault();
    const confirmDelete = window.confirm("Are you sure you want to delete your post?");
    if (confirmDelete) {
      // Delete user from localStorage
      deleteReview(props.username, title, rating, postTrimmed)
      // Visual cue for alerting user profile is deleted
      alert("Your post is now deleted!");
      // Navigate to the home page.
      navigate("/forum");
      // Refresh page
      navigate(0);
    }
  };

  // When the component is first loaded, the code checks if there's any review data stored. 
  // Then the code fetches the reviews data from the storage. 
  // Next it updates the posts state with the fetched reviews and the component re-render, displaying the reviews on the page.
  useEffect(() => {
    initReviews();
    const reviews = getReviews();
    setPosts(reviews);
  }, []);

  const handleInputChange = (event) => {
    setPost(event.target.value);
  }

  const handleSubmit = (event, rating, title) => {
    event.preventDefault();

    // Trim the post text.
    const postTrimmed = post.trim();

    if (postTrimmed === "") {
      setErrorMessage("A post cannot be empty.");
      return;
    }
    else if(postTrimmed.length > 250) {
      setErrorMessage("The post has exceeded the maximum length of 250 characters.");
      return;
    }
    else if(rating < 1 || rating > 5){
      setErrorMessage("Please select a rating.");
      return;
    }

    // Create post.
    addNewReview(props.username, title, rating, postTrimmed); // Correct values are being added
    const reviews = getReviews(); // Fetch updated reviews
    setPosts(reviews); // Update state with new reviews

    // Reset post content.
    setPost("");
    setErrorMessage("");
    navigate("/forum");
    navigate(0)
  }

  return (
    <>
    <h1 className="section-title">Select A Movie To Leave A Review</h1>
    <section className="movie-section">
        <div className='movie-row'>
          <div className='movie-column'>
          <MovieCard
            imageUrl="https://cdn.palacecinemas.com.au/CDN/Image/Entity/FilmPosterGraphic/HO00016663"
            title="Barbie"
            text="Click to leave a review"
            handleSubmit={(event, rating) => handleSubmit(event, rating, "Barbie")}
            handleInputChange={handleInputChange}
            errorMessage={errorMessage}
            post={post}/>
          </div>
          <div className='movie-column'>
            <MovieCard
            imageUrl="https://cdn.palacecinemas.com.au/CDN/Image/Entity/FilmPosterGraphic/HO00016619"
            title="Oppenheimer"
            text="Click to leave a review"
            handleSubmit={(event, rating) => handleSubmit(event, rating, "Oppenheimer")}
            handleInputChange={handleInputChange}
            errorMessage={errorMessage}
            post={post}/>
          </div>
          <div className='movie-column'>
          <MovieCard
            imageUrl="https://poster.gsc.com.my/2023/230315_MissionImpossible-DeadReckoningPartOne_big.jpg"
            title="Mission: Impossible - Dead Reckoning Part 1"
            text="Click to leave a review"
            handleSubmit={(event, rating) => handleSubmit(event, rating, "Mission: Impossible - Dead Reckoning Part 1")}
            handleInputChange={handleInputChange}
            errorMessage={errorMessage}
            post={post}/>
          </div>
          <div className='movie-column'>
          <MovieCard
            imageUrl="https://poster.gsc.com.my/2023/230714_TheMoon_big.jpg"
            title="The Moon"
            text="Click to leave a review"
            handleSubmit={(event, rating) => handleSubmit(event, rating, "The Moon")}
            handleInputChange={handleInputChange}
            errorMessage={errorMessage}
            post={post}/>
          </div>
          <div className='movie-column'>
            <MovieCard
            imageUrl="https://poster.gsc.com.my/2023/230307_TheMarvels_big.jpg"
            title="The Marvels"
            text="Click to leave a review"
            handleSubmit={(event, rating) => handleSubmit(event, rating, "The Marvels")}
            handleInputChange={handleInputChange}
            errorMessage={errorMessage}
            post={post}/>
          </div>
          <div className='movie-column'>
            <MovieCard
            imageUrl="https://poster.gsc.com.my/2023/230713_Wonka_big.jpg"
            title="Wonka"
            text="Click to leave a review"
            handleSubmit={(event, rating) => handleSubmit(event, rating, "Wonka")}
            handleInputChange={handleInputChange}
            errorMessage={errorMessage}
            post={post}/>
          </div>
          <div className='movie-column'>
          <MovieCard
            imageUrl="https://poster.gsc.com.my/2023/230714_ConcreteUtopia_big.jpg"
            title="Concrete Utopia"
            text="Click to leave a review"
            handleSubmit={(event, rating) => handleSubmit(event, rating, "Concrete Utopia")}
            handleInputChange={handleInputChange}
            errorMessage={errorMessage}
            post={post}/>
          </div>
          <div className='movie-column'>
          <MovieCard
            imageUrl="https://poster.gsc.com.my/2023/230504_DunePartTwo_big.jpg"
            title="Dune Part Two"
            text="Click to leave a review"
            handleSubmit={(event, rating) => handleSubmit(event, rating, "Dune Part Two")}
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
              <div className="post-box">
                <div className="title">                
                  <h3 style={{color: "red"}}>{x.username} ({x.movie})</h3>
                  { 
                    x.username === props.username && (
                      <MDBBtn outline color="light" floating href="" role="button" className="forum-delete-icon" onClick={(event) => handleRemovePost(event, x.movie, x.rating, x.comment)}>
                        <MDBIcon far icon="trash-alt" style={{fontSize: '1rem'}}/>
                      </MDBBtn>
                    )
                  }
                </div>
                <div className="post-content">
                  <p>Movie Rating: {x.rating} star</p>
                  <p>{x.comment}</p>
                </div>
              </div>
              )
          }
        </div>
      </div>
    </>
  );
}

export default Forum;