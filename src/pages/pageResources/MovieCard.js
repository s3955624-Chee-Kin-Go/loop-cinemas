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


function MovieCard({imageUrl, title, text, type, props, handleReviewSubmit, handleInputChange, errorMessage, post }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [MovieModal, setMovieModal] = useState(false);
  const [ReviewModal, setReviewModal] = useState(false);
  const toggleShowMovie = () => setMovieModal(!MovieModal);
  const toggleShowReview = () => setReviewModal(!ReviewModal);

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
                      <li>10:00am</li>
                      <li>12:00pm</li>
                      <li>3:00pm</li>
                      <li>6:00pm</li>
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
  else {
    return (
      <>
      <MDBCard className="hover-overlay" onClick={toggleShowReview} style = {{cursor: "pointer"}}>
        <img src={imageUrl} position="top" style={{aspectRatio:"2/3", width: "250px", objectFit: "cover"}}/>
        <div className='mask' style={{backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <div>
            <p style={{fontFamily: "var(--font-montserrat)", fontSize: "23px", fontWeight: "600", color: "rgb(255, 255, 255)", textAlign:"center", lineHeight: "33.6px"}}>{title}</p>
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
                    />
                  </label>
                );
              })}
            </div>
              <p>Your rating for the movie is {rating} star</p>
                <h3 style={{color:"red"}}>New Post</h3>
                <form onSubmit={handleReviewSubmit}>                  
                  <fieldset>
                    <textarea name="post" id="post" className="new-post" rows="5" value={post} onChange={handleInputChange}/>
                    {errorMessage !== null && (<span className="text-danger">{errorMessage}</span>)}
                    <input type="button" className="forum-button" value="Cancel" onClick={toggleShowReview}/>
                    <input type="submit" className="forum-button" value="Post"/>
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