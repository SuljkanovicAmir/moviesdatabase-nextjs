"use client"

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect, useLayoutEffect  } from "react";
import ScrollButtons from '../components/reusables/ScrollButtons'

export default function PopularMovies () {

    const [results, setResults] = useState([]);
    const [scrollPosition, setScrollPosition] = useState(0);
    const movieListRef = useRef(null);
    const [movieListWidth, setMovieListWidth] = useState(0);
   
    const imagePath = 'https://image.tmdb.org/t/p/w185'
   
    
    useEffect(() => {
        async function fetchPopular() {
            const today = new Date().toISOString().slice(0, 10);
            const data = await  await fetch(
                `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
                {next: { revalidate: 43200 }}
              );
            const res = await data.json()
            setResults(res.results);
        }
        fetchPopular();
      }, []);

      useLayoutEffect(() => {
        if (movieListRef.current) {
          setMovieListWidth(movieListRef.current.scrollWidth);
        }
      }, [results]);


    return (
        <div className="movie-list-div"> 
            <h3>Popular Movies</h3>
            <div className="movie-list" ref={movieListRef}> 
            {results.map((popular) => (
                <Link key={popular.id}  href={`/movie/${popular.id}`}>  
                    <Image className="poster"src={imagePath + popular.poster_path} priority alt={popular.title} width={500} height={500}/>
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


