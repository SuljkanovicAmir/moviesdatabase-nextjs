import Image from "next/image"


export default async function TvDetails ( {params}) {
    const { tvshow } = params
    const imagePath = 'https://image.tmdb.org/t/p/original'

    const res = await fetchTvDetails(tvshow);
 
    return (
        <div className="details-container">
            <div className="details">
                <div>
                    <div className="backdrop"></div>
                    <Image className="detailed-poster" quality={100} priority src={imagePath + res.backdrop_path} alt={res.name} width={1000} height={1000}/>
                </div>
                <div className="details-info">
                    <div className="info">
                        <h2>{res.name}</h2>
                        <div>
                            <span>{res.networks[0]?.name}</span>
                            -
                            <p className="vote-average">{parseFloat(res.vote_average).toFixed(1)}<span>/10</span></p>
                            -
                            <span>{res.episode_run_time} min</span>
                            -
                            <span>{res.genres[0]?.name}</span>
                        </div>
                        </div>
                        <p className="overview">{res.overview}</p>
                        <div className="season-info">
                            <p>Seasons: {res.number_of_seasons} -</p>
                            <p>Episodes: {res.number_of_episodes}</p>
                        </div>
                        <div>
                            <span>Created by: </span>
                            <span>{res.created_by[0]?.name} </span>
                            <span> {res.created_by[1]?.name} </span>
                        </div>
                    </div>
            </div>
        </div>
    );
}



async function fetchTvDetails(tvshow) {
    const data = await fetch(`https://api.themoviedb.org/3/tv/${tvshow}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`, {next: {revalidate: 180}}) 
    return data.json()
}
