import Image from "next/image";
import Link from "next/link";



async function fetchCombinedCredits(cast) {
    const data = await fetch(
      `https://api.themoviedb.org/3/person/${cast}/combined_credits?api_key=${process.env.NEXT_PUBLIC_API_KEY}&page=1`
    );
    const res = await data.json();
    const sortedCast = res.cast.sort((a, b) => b.vote_average - a.vote_average);
    return sortedCast.slice(0, 12);
  }



export default async function({ params }) {
    const {cast} = params

    const res = await fetchCombinedCredits(cast)
    const imagePath = 'https://image.tmdb.org/t/p/w200'


    return (
        <div className="cast movie-list-div"> 
        <h3 >Known For</h3>
        {res.length > 0 &&
        <div className="cast-movie-list"> 
        {res.map((cast) => (
            <Link key={cast.id}  href={`${cast.title ? `/movie/${cast.id}` :  `/tv/${cast.id}`}`}>
                <h2 className="cast-movie-title" >{cast.original_title ? cast.original_title : cast.original_name} </h2>
                <Image className="cast-movie poster"src={imagePath + cast.poster_path} priority alt={cast.title ? cast.title : cast.name} width={500} height={500}/>
                {cast.character ? 
                    <p className="cast-char">{cast.character}</p>
                    :
                    <p className="cast-char">-</p>
                }
                
                <p style={{textTransform:"uppercase"}}>{cast.media_type}</p>
                {cast.episode_count ? 
                <p className="cast-char" >Episodes: {cast.episode_count}</p> :
                <></>
                }
            </Link>
        ))}
        </div>
       }
    </div>
    );
}