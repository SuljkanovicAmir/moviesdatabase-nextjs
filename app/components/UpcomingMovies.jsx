import Image from "next/image";
import Link from "next/link";


async function fetchUpcoming() {
    const today = new Date().toISOString().slice(0, 10);
    const data = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.NEXT_PUBLIC_API_KEY}&region=US&language=en-US&release_date.gte=${today}`,  {next: { revalidate: 3600 },}) 
    const res = await data.json()
    const resResults = res.results;
    return resResults;
}



export default async function UpcomingMovies() {

    const res = await fetchUpcoming();

    const imagePath = 'https://image.tmdb.org/t/p/w200'


    return (
        <div className="movie-list-div"> 
            <h3>Upcoming Movies</h3>
            {res.length > 0 &&
            <div className="movie-list"> 
            {res.map((movie) => (
                <Link key={movie.id}  href={`${movie.title ? `/movie/${movie.id}` :  `/tv/${movie.id}`}`}>  
                    <Image className="poster"src={imagePath + movie.poster_path} quality={50} priority alt={movie.title ? movie.title : movie.name} width={300} height={300}/>
                    <p className="release-date">Release date: {movie.release_date}</p>
                </Link>
            ))}
            </div>
           }
        </div>
    );
}


