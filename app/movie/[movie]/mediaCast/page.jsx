import Link from "next/link";



async function fetchCast(mediaId, mediaType) {
    const data = await fetch(`https://api.themoviedb.org/3/${mediaType}/${mediaId}/credits?api_key=${process.env.NEXT_PUBLIC_API_KEY}&limit=10`,  {next: { revalidate: 3600 },}) 
    const res = await data.json()
    const resResults = res.cast;
    return resResults;
}



export default async function MediaCast( { mediaId, mediaType }) {
   

    const res = await fetchCast(mediaId, mediaType);
    const imagePath = 'https://image.tmdb.org/t/p/w200'
    

    return (
        <div className="outsider movie-list-div cast-list-div"> 
            <h3>Top Cast</h3>
            {res.length > 0 &&
            <div className="cast-list"> 
            {res.slice(0, 10).map((cast) => (
                <>
                <Link key={cast.id}  href={`/cast/${cast.id}`} >  
                     <div className="cast-img" style={{ backgroundImage: `url(${imagePath + cast.profile_path})` }}></div>
                    <p>{cast.name}</p>
                    <p className="cast-char">{cast.character}</p>
                </Link>
                </>
            ))}
            </div>
           }
        </div>
    );
}