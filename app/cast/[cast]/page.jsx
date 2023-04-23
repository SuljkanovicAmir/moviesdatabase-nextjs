
import Image from 'next/image';
import CastInMovies from '../CastInMovies';



async function fetchPerson(cast) {
  const data = await fetch(
    `https://api.themoviedb.org/3/person/${cast}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
    { next: { revalidate: 43200 } }, {cache: 'force-cache'}
  );
  const res = await data.json();
  return res;
}

export default async function PersonDetails({params}) {

  const { cast } = params;


  const res = await fetchPerson(cast);

  const imagePath = 'https://image.tmdb.org/t/p/w780';

  return (
    <div>
    <div className='cast-details'>
      {res.profile_path && (
        <Image
          src={imagePath + res.profile_path}
          alt={res.name}
          width={500}
          height={500}
          className='cast-details-image'
        />
      )}
        <div>
          <h1>{res.name}</h1>
          <p className='cast-bio'>{res.biography}</p>
          <ul>
            {res.known_for_department && (
              <li>Department: {res.known_for_department}</li>
            )}
            {res.birthday && <li>Born: {res.birthday}</li>}
            {res.place_of_birth && (
              <li>Place of birth: {res.place_of_birth}</li>
            )}
          </ul>
        </div>
      </div>
        <CastInMovies  params={params}/>
    </div>
    
  );
}