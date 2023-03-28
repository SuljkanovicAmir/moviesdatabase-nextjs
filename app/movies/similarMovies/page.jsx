import Image from "next/image";
import Link from "next/link";





export default async function SimilarMovies( {resSimilar}) {

    const res = resSimilar
    const imagePath = 'https://image.tmdb.org/t/p/original'

    return (
        <div className="movie-list-div"> 
            <h3>More Like This</h3>
            {res.results.length > 0 &&
            <div className="movie-list"> 
            {res.results.map((similar) => (
                <Link key={similar.id}  href={`/movie/${similar.id}`}>  
                    <Image className="poster"src={imagePath + similar.poster_path} priority alt={similar.title} width={500} height={500}/>
                </Link>
            ))}
            </div>
           }
        </div>
    );
}