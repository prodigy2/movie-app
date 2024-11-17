import { GetServerSideProps } from 'next';
import Link from 'next/link';

interface MovieDetail {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  release_date: string;
  vote_average: number;
}

interface MovieDetailProps {
  movie: MovieDetail;
}

const MovieDetailPage = ({ movie }: MovieDetailProps) => {
  return (
    <div className="p-4">
      <Link href="/">← Torna indietro</Link>
      <h1 className="text-2xl font-bold">{movie.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="my-4"
      />
      <p><strong>Voto:</strong> {movie.vote_average}</p>
      <p><strong>Data di uscita:</strong> {movie.release_date}</p>
      <p>{movie.overview}</p>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const res = await fetch(`https://api.themoviedb.org/3/movie/${params?.id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`);
  const movie = await res.json();

  return {
    props: {
      movie,
    },
  };
};

export default MovieDetailPage;

