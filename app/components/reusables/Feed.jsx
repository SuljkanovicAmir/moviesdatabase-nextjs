"use client"
import React, {useState, useEffect, useContext} from 'react'
import { UserContext } from '@/app/context/UserContext';
import dynamic from 'next/dynamic';
import Loading from '../Loading';

const Content = dynamic(() => import("./Content"), {
    loading: () => <Loading />,
    ssr: false,
  });

function Feed(props) {
    
  const { watchedData, watchlistData, image, at } = props;

  if (watchedData) {
    const watchedContent = watchedData.map((media) => {
      return <Content key={media.id} rating={media.rating} at={at} image={image} movieID={media.movieID} watchedData={watchedData} />;
    });
    return (
      <div className="profile-watched-content-div">
        <div className="profile-watched-list">{watchedContent}</div>
      </div>
    );
  } else if (watchlistData) {
    const watchlistContent = watchlistData.map((media) => {
      return <Content key={media.id} image={image} movieID={media.movieID} watchlistData={watchlistData} />;
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