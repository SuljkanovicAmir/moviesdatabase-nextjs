"use client"
import { useState, useContext } from 'react';
import AddIcon from '../../public/add.png'
import Image from 'next/image';
import { UserContext } from '../context/UserContext';


export default function AddToListButton({movieID}) {
  const {userName, userAt, userID, userToWatch, userWatched} = useContext(UserContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);



  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  }

  const handleAddToWatchlistClick = (e) => {
    addToWatchlist(e)
    // TODO: Add logic to add movie/TV show to watchlist
    setIsDropdownOpen(false);
  }

  const handleAddToWatchedClick = (e) => {
    addToWatched(e)
    // TODO: Add logic to add movie/TV show to watched list
    setIsDropdownOpen(false);
  }

  const addToWatched = (e) => {
    e.preventDefault();
      import("./functions/addToWatched.js")
            .then((addToWatched) =>
              addToWatched.default({ userName, userAt, userID, userWatched, movieID})
            )
            .catch((err) => console.log(err));   
	};


  const addToWatchlist = (e) => {
    e.preventDefault();
      import("./functions/addToWatchlist.js")
            .then((addToWatchlist) =>
            addToWatchlist.default({ userName, userAt, userID, userToWatch, movieID})
            )
            .catch((err) => console.log(err));   
	};



  return (
    <div className="dropdown">
      <button className="btn" onClick={handleDropdownToggle}>
        <Image src={AddIcon} alt="add" height={500} width={500} />
      </button>
      {isDropdownOpen && (
        <div className="dropdown-menu">
          <button className="dropdown-item" onClick={(e) => handleAddToWatchlistClick(e)}>
           Watchlist
          </button>
          <button className="dropdown-item" onClick={(e) => handleAddToWatchedClick(e)}>
            Watched
          </button>
        </div>
      )}
    </div>
  );
}