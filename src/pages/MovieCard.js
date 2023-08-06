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


function MovieCard({imageUrl, title, text}) {
  const [MovieModal, setMovieModal] = useState(false);

  const toggleShow = () => setMovieModal(!MovieModal);

  return (
    <>
    <MDBCard className="hover-overlay" onClick={toggleShow} style = {{cursor: "pointer"}}>
      <img
        src={imageUrl}
        position="top"
        className="card-image"
      />
      <div className='mask' style={{backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <div>
          <p className='card-title'>{title}</p>
          <p className="card-desc">Click to view session time</p>
        </div>
      </div>
    </MDBCard>

    <MDBModal show={MovieModal} setShow={setMovieModal} tabIndex="-1">
      <MDBModalDialog>
        <MDBModalContent style={{ backgroundColor: 'black', border: "2px solid white", width: "730px", height:"auto"}}>
          <MDBModalBody>
            <div style={{display:"flex", flexDirection: "row"}}>
              <div className="modal-image" style={{marginRight:"15px"}}>
              <img
                src={imageUrl}
                className="card-image"
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
              onClick={toggleShow}
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

export default MovieCard
