import Image from "next/image";
import Loading from "./components/Loading";
import dynamic from "next/dynamic";

const UpcomingMovies = dynamic(
  () => import("./components/UpcomingMovies"), {
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

const OneMovie = dynamic(() => import("./components/OneMovie"), {
  loading: () => <Loading />,
  ssr: false,
});


export default async function Home() {
 
  return (
    <main>
      <Trending mediaType="all"/>
      <div className="main-div">
        <UpcomingMovies />
        <PopularMovies />
        <TrendingTV />
        <TopRated />
        <TopRatedTV />
        <OneMovie />
        <OnAirTV /> 
      </div>
    </main>
  );
}
