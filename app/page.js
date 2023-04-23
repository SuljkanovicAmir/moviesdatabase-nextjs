import Image from "next/image";
import Loading from "./components/Loading";
import dynamic from "next/dynamic";

const UpcomingMovies = dynamic(
  () => import("./components/UpcomingMovies"),
  {
    loading: () => <Loading />,
    ssr: false,
  }
);

const Trending = dynamic(() => import("./components/Trending"), {
  loading: () => <Loading />,
  ssr: false,
});

const TrendingTV = dynamic(() => import("./components/TrendingTV"), {
  loading: () => <Loading />,
  ssr: false,
});


const TopRatedTV = dynamic(() => import("./components/TRatedTV"), {
  loading: () => <Loading />,
  ssr: false,
});

const TopRated = dynamic(() => import("./components/TRatedMovies"), {
  loading: () => <Loading />,
  ssr: false,
});

const OnAirTV = dynamic(() => import("./components/OnAirTV"), {
  loading: () => <Loading />,
  ssr: false,
});

const PopularMovies = dynamic(() => import("./components/PopularMovies"), {
  loading: () => <Loading />,
  ssr: false,
});

export default async function Home() {
  const data = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
    {next: { revalidate: 43200 }}
  );
  const res = await data.json();

  return (
    <main>
      <Trending mediaType="all"/>
      <div className="main-div">
      <UpcomingMovies />
      {res.results.length > 0 && (
        <div className="movie-list-div">
          <h3>Popular Movies</h3>
          <div className="movie-list">
            {res.results.map((movie) => (
              <PopularMovies
                id={movie.id}
                title={movie.title}
                poster_path={movie.poster_path}
                release_date={movie.release_date}
                votes={movie.vote_average}
                genres={movie}
              />
            ))}
          </div>
        </div>
      )}
      <TrendingTV />
      <TopRated />
      <TopRatedTV />
      <OnAirTV /> 
      </div>
    </main>
  );
}
