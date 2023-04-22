import Image from "next/image";
import Link from "next/link";


async function fetchTrending() {
    const data = await fetch(`https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`,  {next: { revalidate: 3600 },}, {cache: 'force-cache'}) 
    return data.json()
}




export default async function TrendingTV() {
    const res = await fetchTrending();
    const imagePath = 'https://image.tmdb.org/t/p/w300'

    return (
        <div className="movie-list-div"> 
            <h3>Trending TV Shows</h3>
            <p className="list-description">Looking for your next binge-worthy show? Our trending TV shows list is the perfect place to start.</p>
            {res.results.length > 0 &&
            <div className="movie-list-wide"> 
            {res.results.map((trendingTV) => (
                <Link key={trendingTV.id}  href={`/tv/${trendingTV.id}`}>  
                    <Image className="poster-wide" src={imagePath + trendingTV.backdrop_path} priority alt={trendingTV.name} width={500} height={500}/>
                </Link>
            ))}
            </div>
           }
        </div>
    );
}