"use client"
"use client"
import { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import Close from '../../public/close.svg'
import Image from 'next/image';

function AddToWatchedForm({isActiveForm, setFormActive, movieID, setShowToast}) {

    const {userName, userAt, userID, userWatched} = useContext(UserContext);

    const [ratingInput, setRatingInput] = useState(0);
    const [reviewInput, setReviewInput] = useState('');


    const handleRating = (event) => {
      const value = parseFloat(event.target.value);
      if (value >= 0 && value <= 5) {
        setRatingInput(value);
      }
    };

    const handleReview = (event) => {
        const value = event.target.value;
        if (value.length <= 200) {
            setReviewInput(value);
        }
      };

    const addToWatched = (e) => {
        e.preventDefault();
          import("./functions/addToWatched.js")
                .then((addToWatched) =>
                  addToWatched.default({ userName, userAt, userID, userWatched, movieID, ratingInput, reviewInput})
                )
                .catch((err) => console.log(err));   
        };
    
   
  
    const handleSubmit = (e) => {
      e.preventDefault();
      addToWatched(e)
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      setFormActive(false)
    };
  

    return (
    <div className={isActiveForm ? 'form-div active' : 'form-div' }>
       <Image src={Close} onClick={() => setFormActive(false)} className="close-icon" alt="close" width={50} height={50} />
      <form onSubmit={handleSubmit}>
        <label>
          Rating:
          <div className='rating'>
            <input
                type="number"
                value={ratingInput}
                onChange={handleRating}
                step="0.1"
                min="0"
                max="5"
            />/5
          </div>
        </label>
        <br />
        <label>
            Review:
          <textarea
            type="text"
            value={reviewInput}
            onChange={handleReview}
            maxLength="250"
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
      </div>
    );
  }

export default AddToWatchedForm