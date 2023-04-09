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
 

export default function Content ({movieID, image, at, rating}) {
  const imagePath = "https://image.tmdb.org/t/p/w200";
  const [content, setContent] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  const imageLoad = () => {
    setImageLoaded(true);
  };

  useEffect(() => {
    async function getContent() {
      const data = await fetchContent(movieID);
      setContent(data);
    }

    getContent();
  }, [movieID]);

  if (!content) {
    return <Loading />;
  }

  return (
    <div className="profile-content">
      <div className="profile-content-header">
        <h1>{content.title}</h1>
        <div>
          <p className="user-at">@{at}</p>
          <div
            className={`${!imageLoaded ? "" : "transparent"}`}
            onLoad={imageLoad}
          >
            <div
              className="avatar"
              style={{ backgroundImage: `url(${image})` }}
            ></div>
          </div>
        </div>
      </div>
      <div className="profile-content-main">
        <Link
          key={content.id}
          href={`${
            content.title ? `/movie/${content.id}` : `/tv/${content.id}`
          }`}
        >
          <Image
            className="poster"
            src={imagePath + content.poster_path}
            priority
            alt={content.title ? content.title : content.name}
            width={500}
            height={500}
          />
        </Link>
        <div className="profile-content-info">
          <span className="vote-average">
            Rating: <span>{rating}</span>
          </span>
          <span>
            Review: The first was so funny but I doubt the second is good. The
            first was so funny but I doubt the second is good
          </span>
        </div>
      </div>
    </div>
  );
}