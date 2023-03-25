import Image from "next/image"




export default async function MovieDetail ( {params}) {
    const { movie } = params
    const imagePath = 'https://image.tmdb.org/t/p/original'
   
    const data = await fetch(`https://api.themoviedb.org/3/movie/${movie}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`, {next: {revalidate: 180}}) 
    const res = await data.json()

    return (
        <div>
            <div>
                <h2>{res.title}</h2>
                <Image className="poster" priority src={imagePath + res.backdrop_path} alt={res.title} width={1000} height={1000}/>
                <p>Runtime: {res.runtime} minutes</p>
                <p>{res.overview}</p>
            </div>
        </div>
    );
}