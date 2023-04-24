"use client"

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect, useLayoutEffect  } from "react";
import ScrollButtons from '../components/reusables/ScrollButtons'


export default function UpcomingMovies() {

    const [results, setResults] = useState([]);
    const [scrollPosition, setScrollPosition] = useState(0);
    const movieListRef = useRef(null);
    const [movieListWidth, setMovieListWidth] = useState(0);

    useEffect(() => {
        async function fetchUpcoming() {
            const today = new Date().toISOString().slice(0, 10);
            const data = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.NEXT_PUBLIC_API_KEY}&region=US&language=en-US&release_date.gte=${today}`,  {next: { revalidate: 43200 },}, {cache: 'force-cache'}) 
            const res = await data.json()
            setResults(res.results);
        }
        fetchUpcoming();
      }, []);

      useLayoutEffect(() => {
        if (movieListRef.current) {
          setMovieListWidth(movieListRef.current.scrollWidth);
        }
      }, [results]);

    const imagePath = 'https://image.tmdb.org/t/p/w185'


    return (
        <div className="movie-list-div"> 
            <h3>Upcoming Movies</h3>
            <div className="movie-list"  ref={movieListRef}> 
            {results.map((movie) => (
                <Link key={movie.id}  href={`/movie/${movie.id}`}>  
                    <Image className="poster"src={imagePath + movie.poster_path} quality={50} priority alt={movie.title} width={300} height={300}/>
                    <p className="release-date">Release date: {movie.release_date}</p>
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


