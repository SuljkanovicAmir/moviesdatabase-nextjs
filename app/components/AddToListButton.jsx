"use client"
import { useState, useContext } from 'react';
import AddIcon from '../../public/add.png'
import Image from 'next/image';
import { UserContext } from '../context/UserContext';
import AddToWatchedForm from './AddToWatchedForm';
import Link from 'next/link';


export default function AddToListButton({movieID, title, name}) {

  const {userName, userAt, userID, userToWatch, currentUser} = useContext(UserContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isActiveForm, setFormActive] = useState(false);
  const [showToast, setShowToast] = useState(false);



  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  }

  const handleAddToWatchlistClick = (e) => {
    addToWatchlist(e)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000);
    setIsDropdownOpen(false);
  }

  const handleAddToWatchedClick = (e) => {
    setFormActive(true)
    setIsDropdownOpen(false);
  }



  const addToWatchlist = (e) => {
    e.preventDefault();
      import("./functions/addToWatchlist.js")
            .then((addToWatchlist) =>
            addToWatchlist.default({ userName, userAt, userID, userToWatch, movieID, title})
            )
            .catch((err) => console.log(err));   
	};


  return (
    <div className="dropdown">
      <div  className={isDropdownOpen ? 'dp-backdrop active' : 'dp-backdrop'} onClick={(e) =>   setIsDropdownOpen(false)}></div>
      <div onClick={() => setFormActive(false)} className={isActiveForm ? 'edit-backdrop active' : 'edit-backdrop' }></div>
      <button className="btn" onClick={handleDropdownToggle}>
        <Image src={AddIcon} className='add' alt="add" height={500} width={500} />
      </button>
      {isDropdownOpen && (
        currentUser ? (
          <div className="dropdown-menu">
          <button className="dropdown-item" onClick={(e) => handleAddToWatchlistClick(e)}>
           Watchlist
          </button>
          <button className="dropdown-item" onClick={(e) => handleAddToWatchedClick(e)}>
            Watched
          </button>
         </div>
        ) : (
          <div className="dropdown-menu">
            <button className="dropdown-item">
              <Link href="/signin">
               Watchlist
              </Link>  
            </button>
            <button className="dropdown-item">
              <Link href="/signin">
               Watched
              </Link> 
            </button>
           </div>
        )
      
      
      )}
       <AddToWatchedForm showToast={showToast} setShowToast={setShowToast} isActiveForm={isActiveForm} setFormActive={setFormActive} title={title} movieID={movieID}/>
      
    </div>
  );
}