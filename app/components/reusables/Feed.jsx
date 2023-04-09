
"use client"
import React, {useState, useEffect, useContext} from 'react'
import { UserContext } from '@/app/context/UserContext';
import dynamic from 'next/dynamic';
import Loading from '../../components/Loading';
import WatchedContent from '../WatchedContent'


function Feed(props) {
    
  const { watchedData, watchlistData, image, at, activeTab } = props;

  if (activeTab === 'watched') {
    const watchedContent = watchedData.map((media) => {
      return <div></div>;
    });
    return (
      <div className="profile-watched-content-div">
        <div className="profile-watched-list"><div></div></div>
      </div>
    );
    } else if (activeTab === 'watchlist') {
    const watchlistContent = watchlistData.map((media) => {
      return  <div></div>;
    });
    return <>
          <div className="movie-list-div"> 
            <div className="movie-list"> 
            <div></div>
            </div>
          </div>
          </>
  } else {
    return <div></div>;
  }
}

export default Feed