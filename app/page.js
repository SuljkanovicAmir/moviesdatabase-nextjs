import Image from 'next/image'
import Header from './header/page';
import Loading from './loading/page';
import Movie from './movie'
import Trending from './trending/page';
import UpcomingMovies from './upcomingMovies/page';

export default async function Home() {

  const data = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_API_KEY}`) 
  const res = await data.json()

  return (
    <main>
      <Header />
      <UpcomingMovies/>
      <Trending />
      <Loading />
      <div className='movie-list-div'>
      <h3>Popular movies</h3>
        <div className="movie-list"> 
          {res.results.map((movie) => 
          <Movie  
            key={movie.id}
            id={movie.id}
            title={movie.title}
            poster_path={movie.poster_path}
            release_date={movie.release_date}
            votes={movie.vote_average}
            genres={movie}
          /> 
        )}
        </div>
      </div>
    </main>
  )
}

