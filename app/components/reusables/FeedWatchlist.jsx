"use client"
import React, {useState, useEffect, useContext} from 'react'
import dynamic from 'next/dynamic';
import Loading from '../Loading';

const WatchlistContent = dynamic(() => import('../WatchlistContent'), {
    loading: () => <Loading />,
    ssr: false,
  });

function Feed(props) {
    
  const {watchlistData, image} = props;

    const watchlistContent = watchlistData.map((media) => {
      return <WatchlistContent key={media.id} image={image} movieID={media.movieID} watchlistData={watchlistData} />;
    });

    return <>
          <div className="movie-list-div"> 
            <div className="movie-list"> 
              {watchlistContent}
            </div>
          </div>
          </>
}

export default Feed