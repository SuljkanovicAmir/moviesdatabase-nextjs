"use client"

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import ScrollButtons from '../components/reusables/ScrollButtons'


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


    return (
        <div className="movie-list-div wide"> 
            <h3>Trending TV Shows</h3>
            <p className="list-description">Looking for your next binge-worthy show? Our trending TV shows list is the perfect place to start.</p>
           
            <div className="movie-list-wide" ref={movieListRef}> 
            {results.map((trendingTV) => (
                <Link key={trendingTV.id}  href={`/tv/${trendingTV.id}`}>  
                    <Image className="poster-wide" src={imagePath + trendingTV.backdrop_path} priority alt={trendingTV.name} width={500} height={500}/>
                </Link>
            ))}
            </div>
            <ScrollButtons
                scrollPosition={scrollPosition}
                setScrollPosition={setScrollPosition}
                movieListRef={movieListRef}
                movieListWidth={movieListWidth}
            />
        </div>
    );
}