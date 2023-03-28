import SimilarMovies from "@/app/movies/similarMovies/page"
import Image from "next/image"


async function fetchSimilar(movie) {
    const data = await fetch(`https://api.themoviedb.org/3/movie/${movie}/similar?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`) 
    return data.json()
}



export default async function MovieDetail ( {params}) {
    const { movie } = params
    const imagePath = 'https://image.tmdb.org/t/p/original'
   
    const data = await fetch(`https://api.themoviedb.org/3/movie/${movie}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`, {next: {revalidate: 180}}) 
    const res = await data.json()

    const resSimilar = await fetchSimilar(movie);
    console.log(resSimilar)

    return (
        <div className="details-container">
            <div className="details">
                <div>
                    <div className="backdrop"></div>
                    <Image className="detailed-poster" priority src={imagePath + res.backdrop_path} alt={res.title} width={1000} height={1000}/>
                </div>
                <div className="details-info">
                    <div className="info">
                        <h2>{res.title}</h2>  
                        <div>
                         <p>{res.runtime} min</p>
                         -
                         <p className="vote-average">{parseFloat(res.vote_average).toFixed(1)}<span>/10</span></p>
                         -
                         <span>{res.genres[0]?.name}</span>
                         -
                         <span>{res.genres[1]?.name}</span>
                        </div>
                    </div>
                    <p className="overview">{res.overview}</p>
                </div>
            </div>
            <SimilarMovies resSimilar={resSimilar} />
        </div>
    );
}