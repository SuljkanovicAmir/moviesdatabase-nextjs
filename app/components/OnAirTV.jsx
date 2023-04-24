"use client"


import Image from "next/image";
import Link from "next/link";
import ScrollButtons from "./reusables/ScrollButtons";
import { useState, useRef, useEffect, useLayoutEffect  } from "react";





export default function LatestTV() {

    const [results, setResults] = useState([]);
    const [scrollPosition, setScrollPosition] = useState(0);
    const movieListRef = useRef(null);
    const [movieListWidth, setMovieListWidth] = useState(0);
    const imagePath = 'https://image.tmdb.org/t/p/w185'


    useEffect(() => {
        async function fetchLatestTV() {
            const data = await fetch(`https://api.themoviedb.org/3/tv/on_the_air?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&with_original_language=en`,  {next: { revalidate: 43200 },}, {cache: 'force-cache'}, {cache: 'force-cache'}) 
            const res = await data.json()
            setResults(res.results);
        }
        fetchLatestTV();
      }, []);

      useLayoutEffect(() => {
        if (movieListRef.current) {
          setMovieListWidth(movieListRef.current.scrollWidth);
        }
      }, [results]);


    return (
        <div className="movie-list-div"> 
            <h3>On The Air</h3>
            <div className="movie-list" ref={movieListRef}> 
            {results.map((tr) => (
                <Link key={tr.id}  href={`/tv/${tr.id}`}>  
                    <Image className="poster"src={imagePath + tr.poster_path} priority alt={tr.name} width={500} height={500}/>
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