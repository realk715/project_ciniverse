"use client";
import React from "react";
import Link from "next/link";
import Movie from "../../../movieToday/movie";
import { useRouter } from "next/navigation";

type Props = {
  params: any;
};

export default async function page({ params }: Props) {
  const { page } = params;
  const router = useRouter();
  const img = "https://image.tmdb.org/t/p/original";
  const url = `https://api.themoviedb.org/3/search/movie?query=&api_key=72eef7bc29be08e73392ec8cc0b64c52&page=${page}`;
  const response = await fetch(url, { next: { revalidate: 120 } });
  const data = await response.json();
  if (page < 1 || page > 500) {
    router.push("/movieToday/page/1");
  }

  return (
    <div className="bg-red-800">
      {page < 2 ? (
        <div className="flex justify-center ">
          <Link href={`/movieToday/page/${Number(page) + 1}`}>
            <div className="flex border border-4 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="white"
                className="w-12 h-12"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062A1.125 1.125 0 013 16.81V8.688zM12.75 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062a1.125 1.125 0 01-1.683-.977V8.688z"
                />
              </svg>
              <span className="text-white text-4xl">NEXT</span>
            </div>
          </Link>
        </div>
      ) : (
        <div className="flex justify-center  ">
          <Link href={`/movieToday/page/${page - 1}`}>
            <div className="flex border border-2 m-2 p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="white"
                className="w-12 h-12"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953l7.108-4.062A1.125 1.125 0 0121 8.688v8.123zM11.25 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953L9.567 7.71a1.125 1.125 0 011.683.977v8.123z"
                />
              </svg>
              <span className="text-white text-4xl">BACK</span>
            </div>
          </Link>
          <Link href={`/movieToday/page/${Number(page) + 1}`}>
            <div className="flex border border-2 m-2 p-2 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="white"
                className="w-12 h-12"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062A1.125 1.125 0 013 16.81V8.688zM12.75 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062a1.125 1.125 0 01-1.683-.977V8.688z"
                />
              </svg>
              <span className="text-white text-4xl">NEXT</span>
            </div>
          </Link>
        </div>
      )}
      <div className="grid gap-2 grid-cols-fluid bg-red-800">
        {data.results.map((movie: any) => (
          <Movie
            key={movie.id}
            id={movie.id}
            title={movie.title}
            poster_path={movie.poster_path}
            page={page}
          />
        ))}
      </div>
    </div>
  );
}
