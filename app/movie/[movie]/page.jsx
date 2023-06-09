import Image from "next/image"
import dynamic from 'next/dynamic'
import MediaCast from "./mediaCast/page"
import AddToListButton from '../../components/AddToListButton'


const SimilarMovies = dynamic(() => import("./similarMovies/page"), {
  loading: () => <p>Loading...</p>,
})



export default async function MovieDetail ( {params}) {
    const { movie } = params
    const imagePath = 'https://image.tmdb.org/t/p/w1280'
   
    const data = await fetch(`https://api.themoviedb.org/3/movie/${movie}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`, {next: {revalidate: 43200}}, {cache: 'force-cache'}) 
    const res = await data.json()

    return (
        <div className="details-container">
            <div className="details">
                <div className="backdrop-div">
                    <div className="backdrop"></div>
                    <AddToListButton movieID={movie} title={res.title}/>
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
            <MediaCast mediaId={movie} mediaType='movie'/>
            <SimilarMovies params={params} />
           
        </div>
    );
}