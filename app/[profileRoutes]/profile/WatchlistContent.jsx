"use client"
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from "@/app/context/UserContext";
import Loading from "../../components/Loading";
import TrashIcon from '../../../public/trash.svg'


async function fetchContent(media, movieID) {
    const response = await fetch(
        `https://api.themoviedb.org/3/${media}/${movieID}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
        { next: { revalidate: 43200 } }, {cache: 'force-cache'}
      );
      return await response.json();
  }
 

export default function WatchlistContent ({movieID, title, mediaID}) {

    const imagePath = "https://image.tmdb.org/t/p/w185";
    const [content, setContent] = useState(null);
    const { userID, userToWatch } = useContext(UserContext);

    useEffect(() => {
        async function getContent() {
          let media = title !== '' ? 'movie' : 'tv';
          const data = await fetchContent(media, movieID);
          setContent(data);
        }
    
        getContent();
      }, [movieID]);
      

      const deleteWatchlistContent = (e) => {
        e.preventDefault();
        if (userID) {
          import("../../components/functions/deleteWatchlistContent").then(
            (deleteWatchlistContent) => {
              deleteWatchlistContent.default(mediaID, userToWatch, userID);
            }
          );
        }
      };
      
      if(!content) {
            return <Loading />
        }

        return (
          <div className="watchlist-div">
            <Link key={content.id} id="watchlist-a"   href={`${content.title ? `/movie/${content.id}` : `/tv/${content.id}`}`}>  
              <Image className="watchlist poster"src={imagePath + content.poster_path} priority   alt={content.title ? content.title : content.name} width={500} height={500}/>     
            </Link>
            <Image src={TrashIcon} onClick={(e) => deleteWatchlistContent(e)} className="delete-icon" alt="delete" height={24} width={24}/>
          </div>
          )
}