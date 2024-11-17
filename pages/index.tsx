import { GetServerSideProps } from 'next';
import Link from 'next/link';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  vote_average: number;
}

interface HomePageProps {
  movies: Movie[];
}

const HomePage = ({ movies }: HomePageProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {movies.map(movie => (
        <div key={movie.id} className="border p-2">
          <Link href={`/movie/${movie.id}`}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full"
            />
            <h2 className="text-lg font-bold">{movie.title}</h2>
            <p>Voto: {movie.vote_average}</p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_API_KEY}`);
  const data = await res.json();

  return {
    props: {
      movies: data.results,
    },
  };
};

export default HomePage;

