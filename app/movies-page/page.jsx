"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import Trending from "../components/Trending";
import Pagination from "../components/Pagination";

export default function AllMovies() {
  const [movies, setMovies] = useState([]);
  const [sort, setSort] = useState("popularity.desc");
  const [genre, setGenre] = useState("");
  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const imagePath = "https://image.tmdb.org/t/p/w300";

  useEffect(() => {
    async function fetchMovies() {
      let url = `https://api.themoviedb.org/3/discover/movie?sort_by=${sort}&page=${page}&api_key=${process.env.NEXT_PUBLIC_API_KEY}`;
      if (genre) {
        url += `&with_genres=${genre}`;
      }
      if (startYear) {
        url += `&primary_release_date.gte=${startYear}-01-01`;
      }
      if (endYear) {
        url += `&primary_release_date.lte=${endYear}-12-31`;
      }
      const response = await fetch(url, { next: { revalidate: 43200 } }, {cache: 'force-cache'});
      const data = await response.json();

      setMovies(data.results);
      setTotalPages(data.total_pages);
    }

    fetchMovies();
  }, [genre, sort, startYear, endYear, page]);

  function handleSortChange(event) {
    setSort(event.target.value);
    setPage(1)
  }

  function handleGenreChange(event) {
    setGenre(event.target.value);
    setPage(1)
  }

  function handleStartYearChange(event) {
    setStartYear(event.target.value);
    setPage(1)
  }

  function handleEndYearChange(event) {
    setEndYear(event.target.value);
    setPage(1)
  }

  return (
    <motion.div
      className="all-movies-tv"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        type: "easeInOut",
        duration: "0.4",
        delay: 0,
      }}
    >
      <Trending mediaType="movie" />
      <h1>Movies</h1>
      <button className="filters-btn" onClick={() => setIsActive(true)}>
        Filters
      </button>
      <div className={isActive ? "filters active" : "filters"}>
        <div>
          <label htmlFor="genre">Filter by genre: </label>
          <select id="genre" value={genre} onChange={handleGenreChange}>
            <option value="">All Genres</option>
            <option value="28">Action</option>
            <option value="12">Adventure</option>
            <option value="16">Animation</option>
            <option value="35">Comedy</option>
            <option value="80">Crime</option>
            <option value="99">Documentary</option>
            <option value="18">Drama</option>
            <option value="10751">Family</option>
            <option value="14">Fantasy</option>
            <option value="36">History</option>
            <option value="27">Horror</option>
            <option value="10402">Music</option>
            <option value="9648">Mystery</option>
            <option value="10749">Romance</option>
            <option value="878">Science Fiction</option>
            <option value="10770">TV Movie</option>
            <option value="53">Thriller</option>
            <option value="10752">War</option>
            <option value="37">Western</option>
          </select>
        </div>
        <div>
          <label htmlFor="startYear">Start Year: </label>
          <input
            type="number"
            id="startYear"
            value={startYear}
            placeholder="Start year"
            min="1920"
            onChange={handleStartYearChange}
          />
        </div>
        <div>
          <label htmlFor="endYear">End Year: </label>
          <input
            type="number"
            id="endYear"
            placeholder="End Year"
            value={endYear}
            onChange={handleEndYearChange}
          />
        </div>
        <div>
          <label htmlFor="sort">Sort by: </label>
          <select id="sort" value={sort} onChange={handleSortChange}>
            <option value="popularity.desc">Popularity (Desc)</option>
            <option value="popularity.asc">Popularity (Asc)</option>
            <option value="vote_average.desc">Rating (Desc)</option>
            <option value="vote_average.asc">Rating (Asc)</option>
          </select>
        </div>
        <div className="filters-btn" onClick={() => setIsActive(false)}>
          Submit
        </div>
      </div>
      <div className="movie-list-div">
        <div className="movie-grid">
          {movies.map((trending) => (
            <Link
              key={trending.id}
              href={`${
                trending.title ? `/movie/${trending.id}` : `/tv/${trending.id}`
              }`}
            >
              <Image
                className="poster"
                src={imagePath + trending.poster_path}
                priority
                alt={trending.title ? trending.title : trending.name}
                width={500}
                height={500}
              />
            </Link>
          ))}
        </div>
        <Pagination page={page} setPage={setPage} totalPages={totalPages} />
      </div>
    </motion.div>
  );
}
