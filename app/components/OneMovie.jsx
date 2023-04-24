"use client"

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect  } from "react";


export default function OneMovie() {

    const [results, setResults] = useState([]);
   
    const imagePath = 'https://image.tmdb.org/t/p/w780'
   
    
    useEffect(() => {
        async function fetchMovie() {
            const data = await fetch(`https://api.themoviedb.org/3/movie/677179?api_key=${process.env.NEXT_PUBLIC_API_KEY}`, {next: {revalidate: 43200}}, {cache: 'force-cache'}) 
            const res = await data.json()
            setResults(res);
        }
        fetchMovie();
      }, []);



    return (
        <div className="promo-movie-div"> 
            <Image className="promo-movie-img" priority src={imagePath + results.backdrop_path} alt={results.title} width={1000} height={1000}/>
            <div className="promo-movie-description">
                <h3>Creed III</h3>
                <p>Creed III" is an upcoming American sports drama film directed by Michael B. Jordan, in which Adonis Creed must confront his past and seek revenge when an unexpected tragedy occurs</p>
                <button>
                    <Link  href={`/movie/677179`}>More info</Link>
                </button>
            </div>
        </div>
    );
}