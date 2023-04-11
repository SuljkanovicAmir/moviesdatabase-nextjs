
"use client"
import React, {useState, useEffect, useContext} from 'react'
import { UserContext } from '@/app/context/UserContext';
import dynamic from 'next/dynamic';
import Loading from '../../components/Loading';
import WatchlistContent from './WatchlistContent';
import WatchedContent from './WatchedContent'


function Feed(props) {
    
  const { watchedData, watchlistData, image, at, activeTab } = props;

  console.log(watchedData, watchlistData)

  if (activeTab === 'watched') {
    const watchedContent = watchedData.map((media) => {
      return <WatchedContent key={media.id} mediaID={media.id} rating={media.rating} review={media.review} at={at} image={image} movieID={media.movieID} watchedData={watchedData} />;
    });
    return (
      <div className="profile-watched-content-div">
        <div className="profile-watched-list">{watchedContent}</div>
      </div>
    );
    } else if (activeTab === 'watchlist') {
    const watchlistContent = watchlistData.map((media) => {
      return  <WatchlistContent key={media.id} mediaID={media.id}  image={image} movieID={media.movieID} watchlistData={watchlistData} />;
    });
    return <>
          <div className="movie-list-div"> 
            <div className="movie-list"> 
              {watchlistContent}
            </div>
          </div>
          </>
  } else {
    return <div></div>;
  }
}

export default Feed