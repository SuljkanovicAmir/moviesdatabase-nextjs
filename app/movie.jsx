import Image from "next/image";
import Link from "next/link";

export default function Movie ({ title, key, id, release_date, poster_path, votes}) {

   
    const imagePath = 'https://image.tmdb.org/t/p/original'
   
    return (
       <>
            <Link href={`/movie/${id}`}>
                <div className="img-description">
                    <div className="img-description-details">
                        <h1>{title}</h1>
                        <p>{release_date}</p>
                        <p>{votes}</p>
                    </div>          
                </div>
                <Image className="poster"src={imagePath + poster_path} priority alt={title} width={500} height={500}/>
            </Link>
          
        </>
    );
}


