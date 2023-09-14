import React from "react";
import Image from "next/image";
import Link from "next/link";
import Movie from "../../movie";
type Props = {
  params: any;
};

export default async function page({ params }: Props) {
  const { page } = params;
  const img = "https://image.tmdb.org/t/p/original";
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=72eef7bc29be08e73392ec8cc0b64c52&page=${page}`;
  const response = await fetch(url, { next: { revalidate: 60 } }); //ครบ60วิ clear cache
  const data = await response.json();
  console.log(data.title);
  return (
    <div className="grid gap-2 grid-cols-fluid bg-red-800">
      <Link href={`/movieToday/page/${page - 1}`}>
        <p className="text-white"> Back</p>
      </Link>
      {data.results.map((movie: any) => (
        <Movie
          key={movie.id}
          id={movie.id}
          title={movie.title}
          poster_path={movie.poster_path}
          page={page}
        />
      ))}
      <Link href={`/movieToday/page/${Number(page) + 1}`}>
        <p className="text-white"> Next</p>
      </Link>
    </div>
  );
}
