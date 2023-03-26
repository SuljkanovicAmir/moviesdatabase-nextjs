import Image from "next/image"


export default async function TvDetails ( {params}) {
    const { tvshow } = params
    const imagePath = 'https://image.tmdb.org/t/p/original'
   
    const data = await fetch(`https://api.themoviedb.org/3/tv/${tvshow}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`, {next: {revalidate: 180}}) 
    const res = await data.json()


   
    const network = res.networks[0].name
    return (
        <div>
            <div>
                <div>
                    <h2>{res.name}</h2>
                    <span>{res.networks[0].name}</span>
                    <span>Episode runtime: {res.episode_run_time}</span>
                    <p>{res.genres[0].name}</p>
                </div>
                <span>{res.created_by[0].name}</span>
                <span>{res.created_by[1].name}</span>
                <span>{res.vote_average}</span>
                <Image className="poster" quality={100} priority src={imagePath + res.backdrop_path} alt={res.name} width={1000} height={1000}/>
                <p>Seasons: {res.number_of_seasons}</p>
                <p>Episodes: {res.number_of_episodes}</p>
                <p>{res.overview}</p>
            </div>
        </div>
    );
}
