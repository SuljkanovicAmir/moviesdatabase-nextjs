"use client"

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

async function gettv(sort, filter) {
    const response = await fetch(`https://api.themoviedb.org/3/discover/movie?sort_by=${sort}&with_genres=${filter}&api_key=${process.env.NEXT_PUBLIC_API_KEY}`);
    const data = await response.json();
    return data.results;
  }



export default function Alltv() {

    const [tv, setTv] = useState([]);
    const [sort, setSort] = useState('popularity.desc');
    const [genre, setGenre] = useState('');
    const [startYear, setStartYear] = useState('');
    const [endYear, setEndYear] = useState('');
  

    const imagePath = 'https://image.tmdb.org/t/p/original'

    useEffect(() => {
        async function fetchtv() {
          let url = `https://api.themoviedb.org/3/discover/tv?sort_by=${sort}&api_key=${process.env.NEXT_PUBLIC_API_KEY}`;
          if (genre) {
            url += `&with_genres=${genre}`;
          }
          if (startYear) {
            url += `&first_air_date.gte=${startYear}-01-01`;
          }
          if (endYear) {
            url += `&first_air_date.lte=${endYear}-12-31`;
          }
          const response = await fetch(url);
          const data = await response.json();
          setTv(data.results);
        }
    
        fetchtv();
      }, [genre, sort, startYear, endYear]);
    
  function handleSortChange(event) {
    setSort(event.target.value);
  }

  function handleGenreChange(event) {
    setGenre(event.target.value);
  }

  function handleStartYearChange(event) {
    setStartYear(event.target.value);
  }

  function handleEndYearChange(event) {
    setEndYear(event.target.value);
  }

  
    return (
        <div className='all-movies-tv'>
            <h1>TV</h1>
    <div className='filters'>
        <div>
        <label htmlFor="genre">Filter by genre: </label>
        <select id="genre" value={genre} onChange={handleGenreChange}>
          <option value="">All Genres</option>
          <option value="10759">Action & Adventure</option>
          <option value="16">Animation</option>
          <option value="35">Comedy</option>
          <option value="80">Crime</option>
          <option value="99">Documentary</option>
          <option value="18">Drama</option>
          <option value="10751">Family</option>
          <option value="10762">Kids</option>
          <option value="9648">Mystery</option>
          <option value="10763">News</option>
          <option value="10764">Reality</option>
          <option value="10765">Sci-Fi & Fantasy</option>
          <option value="10766">Soap</option>
          <option value="10767">Talk</option>
          <option value="10768">War & Politics</option>
          <option value="37">Western</option>
        </select>
      </div>
      <div>
        <label htmlFor="startYear">Start Year: </label>
        <input type="number" id="startYear" value={startYear} placeholder="Start year" min="1920" onChange={handleStartYearChange} />
      </div>
      <div>
        <label htmlFor="endYear">End Year: </label>
        <input type="number" id="endYear" placeholder='End Year' value={endYear} onChange={handleEndYearChange} />
      </div>
      <div>
        <label htmlFor="sort">Sort by: </label>
        <select id="sort" value={sort} onChange={handleSortChange}>
          <option value="popularity.desc">Popularity (Desc)</option>
          <option value="popularity.asc">Popularity (Asc)</option>
          <option value="vote_average.desc">Rating (Desc)</option>
          <option value="vote_average.asc">Rating (Asc)</option>
          <option value="first_air_date.desc">Release Date (Desc)</option>
          <option value="first_air_date.asc">Release Date (Asc)</option>
          <option value="name.asc">Title (Asc)</option>
          <option value="name.desc">Title (Desc)</option>
        </select>
      </div>
      </div>
            <div className="movie-list-div">
            <div className="movie-grid"> 
            {tv.map((trending) => (
                <Link key={trending.id}  href={`${trending.title ? `/movie/${trending.id}` :  `/tv/${trending.id}`}`}>  
                    <Image className="poster"src={imagePath + trending.poster_path} priority alt={trending.title ? trending.title : trending.name} width={500} height={500}/>
                </Link>
            ))}
            </div>
            </div>
      </div>
    );
}