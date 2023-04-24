"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Trending({mediaType}) {
  const [images, setImages] = useState([]);
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const fetchImages = async () => {
      const upcData = await fetch(`https://api.themoviedb.org/3/trending/${mediaType}/week?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,  {next: { revalidate: 43200 }}, {cache: 'force-cache'}) 
      const upcRes = await upcData.json();
      setImages(upcRes.results);
    };
    fetchImages();
  }, []);


  let interval = 6000;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 450); 
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize); 
  }, []);


  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((current + 1) % images.length);
    }, interval);
    return () => clearInterval(timer);
  }, [current, interval, images]);

  const imagePath = "https://image.tmdb.org/t/p/w1280";


  return (
    <div className="slideshow">
      <div className="backdrop"></div>
      {images.length > 0 && (
        <div className="slideshowSlider">
          {images.map((movie, index) => (
             isMobile ? (
                <div
                  className="slide mobile"
                  key={index}
                  style={{
                    display: index === current ? "block" : "none",
                  }}
                >
                  <Image
                    src={imagePath + movie.poster_path}
                    alt={movie.title ? movie.title : movie.name}
                    width={1000}
                    height={1000}
                    className='trending-poster'
                  />
                  <div className="slide-description">
                    <button className="see-more-btn">
                      <Link  href={`${movie.title ? `/movie/${movie.id}` : `/tv/${movie.id}`}`}>More info</Link>
                    </button>
                    </div>
                    <div className="slide-footer">
                      <p>TRENDING</p>
                    </div>
                </div>
              ) : (
                <div
                  className="slide"
                  key={index}
                  style={{
                  backgroundImage: `url(${imagePath + movie.backdrop_path})`,
                  display: index === current ? "block" : "none",
                }}
                >
                  <div className="slide-description">
                  <p>{movie.title ? movie.title : movie.name}</p>
                  <button className="see-more-btn">
                    <Link  href={`${movie.title ? `/movie/${movie.id}` : `/tv/${movie.id}`}`}>More info</Link>
                  </button>
                  </div>
                  <div className="slide-footer">
                    <p>TRENDING</p>
                  </div>
                </div>
              )
           ))}
        </div>
    )}
  </div>
)
}