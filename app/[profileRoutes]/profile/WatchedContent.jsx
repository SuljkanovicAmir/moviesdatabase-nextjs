"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useContext } from "react";
import Loading from "../../components/Loading";
import { UserContext } from "@/app/context/UserContext";
import DotsIcon from "../../../public/dots.svg";

async function fetchContent(media, movieID) {
  const response = await fetch(
    `https://api.themoviedb.org/3/${media}/${movieID}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
    { next: { revalidate: 3600 } }
  );
  return await response.json();
}

export default function WatchedContent({
  movieID,
  image,
  at,
  rating,
  review,
  mediaID,
  posterID,
  title
}) 

{
  const { userID, userWatched } = useContext(UserContext);
  const imagePath = "https://image.tmdb.org/t/p/w200";
  const [content, setContent] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [userContent, setUserContent] = useState(false);

  const imageLoad = () => {
    setImageLoaded(true);
  };

  useEffect(() => {
    userID === posterID && setUserContent(true);
}, [userID, posterID]);


useEffect(() => {
    async function getContent() {
      let media = title !== '' ? 'movie' : 'tv';
      const data = await fetchContent(media, movieID);
      setContent(data);
    }

    getContent();
  }, [movieID]);

  const deleteContent = (e) => {
    e.preventDefault();
    if (userID) {
      import("../../components/functions/deleteContent.js").then(
        (deleteContent) => {
          deleteContent.default(mediaID, userWatched, userID);
        }
      );
    }
  };

  const toggleDropdown = (e) => {
    e.stopPropagation();
    if (userID) {
      setDropdown(!dropdown);
    }
  };

  if (!content) {
    return <Loading />;
  }


  return (
    <div className="profile-content">
      <div className="profile-content-header">
        <h1>{content.title || content.name}</h1>
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
          <div className="dots" onClick={(e) => toggleDropdown(e)}>
            <Image src={DotsIcon} height={24} width={24} alt="dots" />
        </div>
        {userContent ? (
        <div
              onClick={(e) => deleteContent(e)}
              className={
                dropdown ? "post-dropdown active" : "post-dropdown"
              }
            >
              Delete post
            </div>
             ) : (
              ""
            )
          }
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
            Rating: <span>{rating}/5</span>
          </span>
          <span>{review}</span>
        </div>
      </div>
    </div>
  );
}
