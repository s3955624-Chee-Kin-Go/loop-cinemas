import React, { useState } from "react";
import {
  MDBCard,
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalTitle,
  MDBModalBody,
} from "mdb-react-ui-kit";

import "./StarRating.css"
import { FaStar} from 'react-icons/fa'

function MovieCard({ imageUrl, title, averageRating, text, type, sessionTime, handleSubmit, handleInputChange, errorMessage, post }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [MovieModal, setMovieModal] = useState(false);
  const [ReviewModal, setReviewModal] = useState(false);
  const toggleShowMovie = () => setMovieModal(!MovieModal);
  const toggleShowReview = () => setReviewModal(!ReviewModal);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  // MovieCard for displaying coming soon movie
  if (type === "movie") {
    return (
      <>
      <MDBCard className="hover-overlay" onClick={toggleShowMovie} style = {{cursor: "pointer"}}>
        <img
          src={imageUrl}
          position="top"
          style={{aspectRatio:"2/3",width: "250px", objectFit: "cover"}}
        />
        <div className='mask' style={{backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <div>
            <p style={{fontFamily: "var(--font-montserrat)", fontSize: "23px", fontWeight: "600", color: "rgb(255, 255, 255)", textAlign:"center", lineHeight: "33.6px"}}>{title}</p>
            <p style={{fontFamily: "var(--font-montserrat)", fontSize: "15px", fontWeight: "400", color: "rgb(255, 255, 255)", textAlign:"center"}}>Average Rating: {averageRating.toFixed(2)}</p>
            <p style={{fontFamily: "var(--font-montserrat)", fontSize: "15px", fontWeight: "300", color: "rgb(255, 255, 255)", textAlign:"center"}}>{text}</p>
          </div>
        </div>
      </MDBCard>
      <MDBModal show={MovieModal} setShow={setMovieModal} tabIndex="-1" centered>
        <MDBModalDialog centered style={{maxWidth: "35%"}} size="lg">
          <MDBModalContent style={{ backgroundColor: 'black', border: "2px solid #E50815"}}>
            <MDBModalBody>
              <div style={{display:"flex", flexDirection: "row"}}>
                <div className="modal-image" style={{marginRight:"15px"}}>
                <img
                  src={imageUrl}
                  style={{aspectRatio:"2/3",width: "250px", objectFit: "cover"}}
                />
                </div>
                <div style={{marginLeft:"15px", width: "100%"}}>
                  <MDBModalTitle style={{color:"white", fontFamily:"var(--font-montserrat)"}}>{title}</MDBModalTitle>
                  <div className="" style={{marginTop: "10px"}}>
                    <p style={{color:"white", fontFamily:"var(--font-montserrat)"}}>Session Time</p>
                    <ul style={{color:"white", fontFamily:"var(--font-montserrat)"}}>
                    {/* Display all session time*/}
                    {
                      sessionTime.map((time) =>
                      <li>{time}</li>
                    )}
                    </ul>
                  </div>
                </div>
                <div style={{marginLeft:"15px"}}>
                <MDBBtn
                  className="btn-close"
                  color="none"
                  onClick={toggleShowMovie}
                  style={{backgroundColor: "white"}}>
                </MDBBtn>
                </div>
              </div>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
      </>
    );
  } 

  // MovieCard for displaying movie for review
  else {
    return (
      <>
      <MDBCard className="hover-overlay" onClick={toggleShowReview} style = {{cursor: "pointer"}}>
        <img src={imageUrl} position="top" style={{aspectRatio:"2/3", width: "250px", objectFit: "cover"}}/>
        <div className='mask' style={{backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <div>
            <p style={{fontFamily: "var(--font-montserrat)", fontSize: "23px", fontWeight: "600", color: "rgb(255, 255, 255)", textAlign:"center"}}>{title}</p>
            <p style={{fontFamily: "var(--font-montserrat)", fontSize: "15px", fontWeight: "400", color: "rgb(255, 255, 255)", textAlign:"center"}}>Average Rating: {averageRating.toFixed(2)}</p>
            <p style={{fontFamily: "var(--font-montserrat)", fontSize: "15px", fontWeight: "300", color: "rgb(255, 255, 255)", textAlign:"center"}}>{text}</p>
          </div>
        </div>
      </MDBCard>
      <MDBModal show={ReviewModal} setShow={setReviewModal} tabIndex="-1" centered>
        <MDBModalDialog centered style={{maxWidth: "35%"}} size="lg">
          <MDBModalContent style={{ backgroundColor: 'black', border: "2px solid #E50815"}}>
            <MDBModalBody>
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
              <p>Your rating for the movie is {rating} star</p>
                <h3 style={{color:"red", fontFamily: "var(--font-montserrat)", fontSize: "28px", fontWeight: "600"}}>Your Comment</h3>
                <form onSubmit={handleSubmit}>                  
                  <fieldset>
                    <textarea name="post" id="post" className="new-post" rows="5" value={post} onChange={handleInputChange}/>
                    {errorMessage !== null && (<span className="text-danger">{errorMessage}</span>)}
                    <br></br>
                    <input type="submit" className="btn submit-btn" value="POST" style ={{marginRight:"1rem"}} onClick={(event) => handleSubmit(event, rating, title)}/>
                    <input type="button" className="btn submit-btn" value="CANCEL" onClick={toggleShowReview}/>
                  </fieldset>
                </form>
                <div style={{marginLeft:"15px"}}>
              </div>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
      </>
    );
  }
}

export default MovieCard