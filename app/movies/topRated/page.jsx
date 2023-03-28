import Image from "next/image";
import Link from "next/link";


async function fetchTrending() {
    const data = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`) 
    return data.json()
}





export default async function TopRated() {
    const res = await fetchTrending();

    const imagePath = 'https://image.tmdb.org/t/p/original'


    return (
        <div className="movie-list-div"> 
            <h3>Top Rated Movies</h3>
            {res.results.length > 0 &&
            <div className="movie-list"> 
            {res.results.map((trending) => (
                <Link key={trending.id}  href={`/movie/${trending.id}`}>  
                    <Image className="poster"src={imagePath + trending.poster_path} priority alt={trending.title} width={500} height={500}/>
                </Link>
            ))}
            </div>
           }
        </div>
    );
}