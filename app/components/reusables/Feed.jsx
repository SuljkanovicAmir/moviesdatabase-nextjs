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
    
  const { watchedData, image, at} = props;

  console.log(watchedData)

    const watchedContent = watchedData.map((media) => {
        return <Content key={media.id} rating={media.rating} at={at} image={image}movieID={media.movieID} />;
    });

  
    return ( 
    <div className='feed'>
        <div className="profile-watched-content-div"> 
          <div className="profile-watched-list"> 
            {watchedContent}
          </div>
        </div>
    </div>
   )
}

export default Feed