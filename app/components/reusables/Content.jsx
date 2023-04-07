"use client"
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from 'react';
import Loading from "../Loading";



async function fetchContent(movieID) {
    const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieID}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
        { next: { revalidate: 3600 } }
      );
      return await response.json();
  }
 

export default function Content ({movieID}) {

    const imagePath = "https://image.tmdb.org/t/p/w200";
    const [content, setContent] = useState(null);
    
    useEffect(() => {
        async function getContent() {
          console.log(movieID)
          const data = await fetchContent(movieID);
          setContent(data);
        }
    
        getContent();
      }, [movieID]);

      if(!content) {
        return <Loading />
      }
      return (
            <Link key={content.id}  href={`${content.title ? `/movie/${content.id}` :  `/tv/${content.id}`}`}>  
                <Image className="poster"src={imagePath + content.poster_path} priority alt={content.title ? content.title : content.name} width={500} height={500}/>
            </Link>
    );
}