import Image from "next/image";
import Link from "next/link";


async function fetchTopRated() {
    const data = await fetch(`https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`,  {next: { revalidate: 43200 },}, {cache: 'force-cache'}) 
    return data.json()
}




export default async function TopRatedTV() {
    const res = await fetchTopRated();
    const imagePath = 'https://image.tmdb.org/t/p/w185'

    return (
        <div className="movie-list-div"> 
            <h3>Top Rated TV Shows</h3>
            {res.results.length > 0 &&
            <div className="movie-list"> 
            {res.results.map((top) => (
                <Link key={top.id}  href={`/tv/${top.id}`}>  
                    <Image className="poster" src={imagePath + top.poster_path} priority alt={top.name} width={500} height={500}/>
                </Link>
            ))}
            </div>
           }
        </div>
    );
}