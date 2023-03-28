import Image from "next/image";
import Link from "next/link";



async function fetchSimilar(movie) {
   
}




export default async function SimilarMovies( { params }) {
    const { movie } = params

    const data = await fetch(`https://api.themoviedb.org/3/movie/${movie}/similar?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`) 
    const res = await data.json()

    const imagePath = 'https://image.tmdb.org/t/p/original'
    console.log(res)
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