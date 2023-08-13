import React, { useState } from "react";
import "./pagesCSS/Forum.css"
import { FaStar} from 'react-icons/fa'

function StarRating() {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(null);
    return (
      <>
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
      </>
    );
  }
  
export default StarRating;