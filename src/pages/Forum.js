import React, { useState, useEffect } from "react";
import "./pagesCSS/Forum.css"
import { useNavigate } from "react-router-dom";
import MovieCard from './pageResources/MovieCard';
import { getMovies, sortMovies, initReviews, addNewReview, getReviews, editReview, deleteReview} from "../data/repository";
import {
  MDBIcon,
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalBody
} from 'mdb-react-ui-kit';
import { FaStar} from 'react-icons/fa'

// NOTE: The posts are not persistent and will be lost when the component unmounts.
// Could store the posts in localStorage, within the parent component, in a context, etc...
function Forum(props) {
  const navigate = useNavigate();
  const movies = getMovies();
  const [post, setPost] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [posts, setPosts] = useState([]); // Store posts in state
  const [selectedPostIndex, setSelectedPostIndex] = useState(null);
  const [EditReviewModal, setEditReviewModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);

  const showForum = (index) => {
    setSelectedPostIndex(index);
    setEditReviewModal(true);
  };  

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };


  // Implement remove user functionality
  const handleEditPost = (event, newRating, newPost, postIndex) => {
    console.log("POST INDEX: " + postIndex);
    console.log("NEW POST: " + newPost);
    console.log("NEW RATING: " + newRating);
    event.preventDefault();
    const confirmDelete = window.confirm("Are you sure you want to edit your post?");
    if (confirmDelete) {
      // Delete user from localStorage
      editReview(newRating, newPost, postIndex)
      // Visual cue for alerting user profile is deleted
      alert("Your post is now edited!"); 
      // Sort Movies
      sortMovies();
      // Navigate to the forum page.
      navigate("/forum");
      // Refresh page
      navigate(0);
    }
  };

  // Implement remove user functionality
  const handleRemovePost = (event, title, rating, postTrimmed) => {
    event.preventDefault();
    const confirmDelete = window.confirm("Are you sure you want to delete your post?");
    if (confirmDelete) {
      // Delete user from localStorage
      deleteReview(props.username, title, rating, postTrimmed)
      // Visual cue for alerting user profile is deleted
      alert("Your post is now deleted!");
      // Sort Movies
      sortMovies();
      // Navigate to the forum page.
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

  // Scroll to toip when posts array changed (i.e. review edited, review deleted)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [posts]);

  const handleInputChange = (event) => {
    setPost(event.target.value);
  }

  const handleSubmit = (event, rating, title) => {
    event.preventDefault();

    // Trim the post text.
    const postTrimmed = post.trim();

    if (postTrimmed === "") {
      setErrorMessage("Your ratings and/or comment cannot be empty.");
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
    // Sort Movies
    sortMovies();
    // Navigate to forum page
    navigate("/forum");
    // Refresh page
    navigate(0)
  }

  return (
    <>
    <h1 className="section-title">Select A Movie To Leave A Review</h1>
    <section className="movie-section">
        <div className='movie-row'>
          {
          movies.map((movie) =>
            <div className='movie-column'>
              <MovieCard
              imageUrl={movie.imageURL[0]}
              title={movie.title}
              text="Click to leave a review"
              averageRating = {movie.averageRating}
              handleSubmit={(event, rating) => handleSubmit(event, rating, movie.title)}
              handleInputChange={handleInputChange}
              errorMessage={errorMessage}
              post={post}/>
            </div>
          )
          }
        </div>
      </section>
      <div className="content">
        <h1>Forum</h1>
        <div>
          {
            posts.length === 0 ?
              <span style={{color: "white"}}>No posts have been submitted.</span>
              :
              posts.map((x, index) =>
              <div className="post-box">
                <div className="title">                
                  <h3 style={{color: "red"}}>{x.username} ({x.movie})</h3>
                  { 
                    x.username === props.username && (
                      <div>
                        <MDBBtn outline color="light" floating href="" role="button" className="forum-delete-icon" onClick={() => showForum(index)}>
                          <MDBIcon far icon="edit" style={{fontSize: '1rem'}}/>
                        </MDBBtn>
                        <MDBBtn outline color="light" floating href="" role="button" className="forum-delete-icon" onClick={(event) => handleRemovePost(event, x.movie, x.rating, x.comment)}>
                          <MDBIcon far icon="trash-alt" style={{fontSize: '1rem'}}/>
                        </MDBBtn>
                      </div>
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
      <MDBModal show={EditReviewModal} setShow={setEditReviewModal} tabIndex="-1" centered>
        <MDBModalDialog centered style={{ maxWidth: "35%" }} size="lg">
          <MDBModalContent style={{cbackgroundColor: "black", border: "2px solid #E50815", borderRadius: "0px"}}>
            <MDBModalBody style={{padding: "0"}}>
              <section className="signin-section" style={{padding: "0"}}>
                <div className="signin-container" style={{margin: "0", width: "auto", border: "none", borderRadius: "0px"}}>
                  <h1>Edit Post</h1>
                  <div className="signin-row">
                    <form onSubmit={(event) => handleEditPost(event, rating, post, selectedPostIndex)}>
                      <div className="form-container">
                        <div className="star-rating">
                          {[...Array(5)].map((item, index) => {
                            const currRating = index + 1;
                            return (
                              <label key={index} onMouseEnter={() => setRating(currRating)}>
                                <input type="radio" value={currRating} onClick={() => setRating(currRating)} />
                                <FaStar
                                  className="star"
                                  size={40}
                                  color={currRating <= (hover || rating) ? "red" : "white"}
                                  onMouseEnter={() => setHover(currRating)}
                                  onMouseLeave={() => setHover(null)}
                                  onClick={() => handleRatingChange(currRating)}
                                />
                              </label>
                            );
                          })}
                        </div>
                      </div>
                      <div className="form-container">
                        <label htmlFor="email">Comment</label>
                        <textarea name="post" id="post" className="new-post" rows="5" value={post} onChange={handleInputChange}/>
                      </div>
                      <div className="form-container">
                        <input type="submit" className="btn submit-btn" value="UPDATE" style={{marginRight: "1rem"}} onClick={(event) => handleEditPost(event, rating, post, selectedPostIndex)}/>
                        <input type="button" className="btn submit-btn" onClick={() => setEditReviewModal(false)} value="CANCEL"/>
                      </div>
                      {errorMessage !== null && (
                        <div className="form-container">
                          <span className="text-danger">{errorMessage}</span>
                        </div>
                      )}
                    </form>
                  </div>
                </div>
              </section>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}

export default Forum;