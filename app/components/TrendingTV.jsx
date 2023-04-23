"use client"

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import Arrow from '../../public/arrow.png'



export default function TrendingTV() {

    const [results, setResults] = useState([]);
    const [scrollPosition, setScrollPosition] = useState(0);
    const movieListRef = useRef(null);
    const [movieListWidth, setMovieListWidth] = useState(0);

    useEffect(() => {
        async function fetchTrending() {
            const data = await fetch(`https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`,  {next: { revalidate: 43200 },}, {cache: 'force-cache'}) 
            const res = await data.json();
            setResults(res.results);
        }
        if (movieListRef.current) {
            setMovieListWidth(movieListRef.current.scrollWidth);
          }
        fetchTrending();
      }, []);

    const imagePath = 'https://image.tmdb.org/t/p/w300'


    function handleScrollLeft() {
        if (movieListRef.current) {
            const scrollAmount = movieListRef.current.offsetWidth;
            setScrollPosition(scrollPosition - scrollAmount);
            movieListRef.current.scrollTo({
                top: 0,
                left: movieListRef.current.scrollLeft - scrollAmount,
                behavior: "smooth"
            });
        }
    }


    function handleScrollRight() {
        if (movieListRef.current) {
          const scrollAmount = movieListRef.current.offsetWidth;
          setScrollPosition(scrollPosition + scrollAmount);
          movieListRef.current.scrollTo({
            top: 0,
            left: movieListRef.current.scrollLeft + scrollAmount,
            behavior: "smooth"
          });
        }
      }

    return (
        <div className="movie-list-div"> 
            <h3>Trending TV Shows</h3>
            <p className="list-description">Looking for your next binge-worthy show? Our trending TV shows list is the perfect place to start.</p>
           
            <div className="movie-list-wide" ref={movieListRef}> 
            {results.map((trendingTV) => (
                <Link key={trendingTV.id}  href={`/tv/${trendingTV.id}`}>  
                    <Image className="poster-wide" src={imagePath + trendingTV.backdrop_path} priority alt={trendingTV.name} width={500} height={500}/>
                </Link>
            ))}
            </div>
           
             <div className="button-container">
                    <div className="scroll-button-left" onClick={() => handleScrollLeft()}>
                        <Image src={Arrow} width={50} height={50} alt="arrow" />
                    </div>
                    <div className="scroll-button-right" onClick={() => handleScrollRight()}>
                        <Image src={Arrow} width={50} height={50} alt="arrow" />
                    </div>
            </div>
        </div>
    );
}