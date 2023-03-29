"use client"

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";


  


export default function Search() {

    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const imagePath = 'https://image.tmdb.org/t/p/original'

    console.log(results)
    const handleSearch = async () => {  
        const url = `https://api.themoviedb.org/3/search/multi?api_key=${process.env.NEXT_PUBLIC_API_KEY}&query=${query}&include_adult=false&include_video=false&media_type=movie,tv`;
        try {
        const response = await fetch(url);
        const data = await response.json();
        const filteredResults = data.results.filter((result) => result.media_type !== "person");
        setResults(filteredResults);
        } catch (error) {
        console.error(error);
        }
    };

    const handleQueryChange = (event) => {
        const searchQuery = event.target.value;
        setQuery(searchQuery);
        if (searchQuery.length > 0) {
          handleSearch(searchQuery);
        } else {
          setResults([]);
        }
      };

    return (
        <div className="search-div">
            <div className="input-div">
                <label>Search for Movies and TV Shows</label>
                <input type="text" placeholder="Search" value={query} onChange={handleQueryChange} />
            </div>
            <div className="movie-list-div"> 
            {results.length > 0 &&
            <>
                <h3>Results</h3>
                <div className="movie-list"> 
                {results.map((result) => (
                    <Link key={result.id}  href={`${result.title ? `/movie/${result.id}` :  `/tv/${result.id}`}`}>  
                        <Image className="poster"src={result.poster_path ? imagePath + result.poster_path : imagePath + result.profile_path} priority alt={result.title ? result.title : result.name} width={500} height={500}/>
                    </Link>
                ))}
                </div>
            </>
            }
            </div>
        </div>
    );
}