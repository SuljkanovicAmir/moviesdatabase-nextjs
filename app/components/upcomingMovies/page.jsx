"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function UpcomingMovies() {
  const [images, setImages] = useState([]);
  const [current, setCurrent] = useState(0);

  const today = new Date().toISOString().slice(0, 10);

  useEffect(() => {
    const fetchImages = async () => {
      const upcData = await fetch(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.NEXT_PUBLIC_API_KEY}&region=US&language=en-US&release_date.gte=${today}`,
        { next: { revalidate: 3600 } }
      );
      const upcRes = await upcData.json();
      setImages(upcRes.results);
    };
    fetchImages();
  }, []);

  let interval = 6000;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((current + 1) % images.length);
    }, interval);
    return () => clearInterval(timer);
  }, [current, interval, images]);

  const imagePath = "https://image.tmdb.org/t/p/original";

  return (
    <div className="slideshow">
      <div className="backdrop"></div>
      {images.length > 0 && (
        <div className="slideshowSlider">
          {images.map((movie, index) => (
            <div
              className="slide"
              key={index}
              style={{
                backgroundImage: `url(${imagePath + movie.backdrop_path})`,
                display: index === current ? "block" : "none",
              }}
            >
              <div className="slide-description">
                <p>{movie.title}</p>
                <button className="see-more-btn">
                  <Link href={`/movie/${movie.id}`}>See More</Link>
                </button>
              </div>
              <p className="release-date">Release date: {movie.release_date}</p>
              <div className="slide-footer">
                <p>UPCOMING MOVIES</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
