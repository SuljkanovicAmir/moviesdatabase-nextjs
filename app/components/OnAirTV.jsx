import Image from "next/image";
import Link from "next/link";


async function fetchLatest() {
    const data = await fetch(`https://api.themoviedb.org/3/tv/on_the_air?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&with_original_language=en`,  {next: { revalidate: 3600 },}, {cache: 'force-cache'}) 
    return data.json()
}




export default async function LatestTV() {
    const res = await fetchLatest();
    const imagePath = 'https://image.tmdb.org/t/p/w200'
    console.log(res)
    return (
        <div className="movie-list-div"> 
            <h3>On The Air</h3>
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