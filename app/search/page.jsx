"use client"

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";


async function fetchTrending() {
    const data = await fetch(`https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,  {next: { revalidate: 3600 }}, {cache: 'force-cache'}) 
    const res = await data.json()
    const resResults = res.results;
    return resResults;
}





export default function Search() {

    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [data, setData] = useState([]);
    const imagePath = 'https://image.tmdb.org/t/p/w200'

    useEffect(() => {
        async function fetchData() {
            const res = await fetchTrending();
            setData(res);
        }
    
        fetchData();
      }, []);

    const handleSearch = async () => {  
        const url = `https://api.themoviedb.org/3/search/multi?api_key=${process.env.NEXT_PUBLIC_API_KEY}&query=${query}&include_adult=false&include_video=false&media_type=movie,tv`;
        try {
        const response = await fetch(url, { cache: 'no-store' });
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
           
        
                <h3>Results</h3>
            {results.length > 0 &&
                <div className="movie-list"> 
                {results.map((result) => (
                    <Link key={result.id}  href={`${result.title ? `/movie/${result.id}` :  `/tv/${result.id}`}`}>  
                        <Image className="poster"src={result.poster_path ? imagePath + result.poster_path : imagePath + result.profile_path} priority alt={result.title ? result.title : result.name} width={500} height={500}/>
                    </Link>
                ))}
                </div>
           
            }
            </div>
            <div className="movie-list-div"> 
            <h3>Trending</h3>
            {data.length > 0 &&
            <div className="movie-list"> 
            {data.map((trending) => (
                <Link key={trending.id}  href={`${trending.title ? `/movie/${trending.id}` :  `/tv/${trending.id}`}`}>  
                    <Image className="poster"src={imagePath + trending.poster_path} priority alt={trending.title ? trending.title : trending.name} width={500} height={500}/>
                </Link>
            ))}
            </div>
           }
        </div>
        </div>
    );
}