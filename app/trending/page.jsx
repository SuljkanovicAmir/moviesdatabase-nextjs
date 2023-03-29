import Image from "next/image";
import Link from "next/link";


async function fetchTrending() {
    const data = await fetch(`https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.NEXT_PUBLIC_API_KEY}`) 
    const res = await data.json()
    const resResults = res.results;
    return resResults;
}



export default async function Trending() {

    const res = await fetchTrending();

    const imagePath = 'https://image.tmdb.org/t/p/original'


    return (
        <div className="movie-list-div"> 
            <h3>Trending</h3>
            {res.length > 0 &&
            <div className="movie-list"> 
            {res.map((trending) => (
                <Link key={trending.id}  href={`${trending.title ? `/movie/${trending.id}` :  `/tv/${trending.id}`}`}>  
                    <Image className="poster"src={imagePath + trending.poster_path} priority alt={trending.title ? trending.title : trending.name} width={500} height={500}/>
                </Link>
            ))}
            </div>
           }
        </div>
    );
}


