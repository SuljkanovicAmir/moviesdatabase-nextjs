import Image from 'next/image'
import Loading from './components/loading/page';
import dynamic from 'next/dynamic';

const UpcomingMovies = dynamic(() => import('./components/upcomingMovies/page'), {
  loading: () => <Loading />,
  ssr: false 
})

const Trending = dynamic(() => import('./components/trending/page'), {
  loading: () => <Loading />,
  ssr: false 
})

const TopRatedTV = dynamic(() => import('./components/topRatedTv/page'), {
  loading: () => <Loading />,
  ssr: false 
})

const TopRated = dynamic(() => import('./components/topRated/page'), {
  loading: () => <Loading />,
  ssr: false 
})

const PopularMovies = dynamic(() => import('./components/popularMovies/page'), {
  loading: () => <Loading />,
  ssr: false 
})


export default async function Home() {

  const data = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_API_KEY}`, { cache: 'no-store' }) 
  const res = await data.json()

  return (
    <main>
      <UpcomingMovies/>
      <Trending />
      {res.results.length > 0 &&
      <div className='movie-list-div'>
      <h3>Popular movies</h3>
        <div className="movie-list"> 
          {res.results.map((movie) => 
          <PopularMovies  
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
       }
       <TopRated />
       <TopRatedTV />
    </main>
  )
}


