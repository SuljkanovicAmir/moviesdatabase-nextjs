import Image from "next/image";
import Link from "next/link";



async function fetchSimilar(movie) {
    const data = await fetch(`https://api.themoviedb.org/3/movie/${movie}/similar?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`) 
    const res = await data.json()
    const resResults = res.results;
    return resResults;
}


export default async function SimilarMovies( { params }) {
    const { movie } = params

    const res = await fetchSimilar(movie);

   
    const imagePath = 'https://image.tmdb.org/t/p/w200'
    return (
        <div className="movie-list-div"> 
            <h3>More Like This</h3>
            {res.length > 0 &&
            <div className="movie-list"> 
            {res.map((similar) => (
                <Link key={similar.id}  href={`/movie/${similar.id}`}>  
                    <Image className="poster"src={imagePath + similar.poster_path} priority alt={similar.title} width={500} height={500}/>
                </Link>
            ))}
            </div>
           }
        </div>
    );
}