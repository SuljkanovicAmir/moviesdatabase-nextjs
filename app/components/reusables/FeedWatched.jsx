"use client"
import React, {useState, useEffect, useContext} from 'react'
import { UserContext } from '@/app/context/UserContext';
import dynamic from 'next/dynamic';
import Loading from '../../components/Loading';

const WatchedContent = dynamic(() => import("./WatchedContent"), {
    loading: () => <Loading />,
    ssr: false,
  });

function Feed(props) {
    
  const { watchedData, watchlistData, image, at } = props;

  
    const watchedContent = watchedData.map((media) => {
      return <WatchedContent key={media.id} rating={media.rating} at={at} image={image} movieID={media.movieID} watchedData={watchedData} />;
    });

    return (
        <div className="profile-watched-content-div">
          <div className="profile-watched-list">{watchedContent}</div>
        </div>
      );

}

export default Feed