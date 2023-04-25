"use client"

import ScrollButtons from "@/app/components/reusables/ScrollButtons";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";







export default  function SimilarTV( { params }) {
    const { tv } = params

    const [results, setResults] = useState([]);
    const [scrollPosition, setScrollPosition] = useState(0);
    const movieListRef = useRef(null);
    const [movieListWidth, setMovieListWidth] = useState(0);

    useEffect(() => {
        async function fetchSimilar() {
            const data = await fetch(`https://api.themoviedb.org/3/tv/${tv}/similar?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`,  {next: { revalidate: 43200 }}, {cache: 'force-cache'}) 
            const res = await data.json()
            setResults(res.results);  
        }
        
        if (movieListRef.current) {
            setMovieListWidth(movieListRef.current.scrollWidth);
          }
          fetchSimilar();
      }, []);
   
    const imagePath = 'https://image.tmdb.org/t/p/w185'
    
    return (
        <div className="movie-list-div"> 
            <h3>More Like This</h3>
            <div className="movie-list"  ref={movieListRef}> 
            {results.map((similar) => (
                <Link key={similar.id}  href={`/tv/${similar.id}`}>  
                    <Image className="poster"src={imagePath + similar.poster_path} priority alt={similar.name} width={500} height={500}/>
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