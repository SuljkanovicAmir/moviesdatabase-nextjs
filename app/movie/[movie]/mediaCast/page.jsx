import Link from "next/link";



async function fetchCast(mediaId, mediaType) {
    const data = await fetch(`https://api.themoviedb.org/3/${mediaType}/${mediaId}/credits?api_key=${process.env.NEXT_PUBLIC_API_KEY}`) 
    const res = await data.json()
    const resResults = res.cast;
    return resResults;
}


export default async function MediaCast( { mediaId, mediaType }) {
   

    const res = await fetchCast(mediaId, mediaType);
    const imagePath = 'https://image.tmdb.org/t/p/original'

    return (
        <div className="outsider movie-list-div cast-list-div"> 
            <h3>Top Cast</h3>
            {res.length > 0 &&
            <div className="cast-list"> 
            {res.map((cast) => (
                <>
                <Link key={cast.id}  href={`/movie/${cast.id}`} >  
                     <div className="cast-img" style={{ backgroundImage: `url(${imagePath + cast.profile_path})` }}></div>
                    <p>{cast.name}</p>
                </Link>
                </>
            ))}
            </div>
           }
        </div>
    );
}