"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import axios from "../Confix_Axios";
import Movie from "./movie";
import Link from "next/link";
const Page = () => {
  const router = useRouter();
  const { loggedIn, setLoggedIn } = useAuth();
  const [data, setData] = useState({ results: [] }); //แก้ปัญหา nullโดยการกำหนด results:[]
  const [page, setPage] = useState<number>(1);
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=72eef7bc29be08e73392ec8cc0b64c52&page=${page}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const jsonData = await response.json();
        setData(jsonData); // กำหนดข้อมูลใน state data
        setPage(jsonData.page);
        console.log(`${page} อิอิ`);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-red-800">
       <div className="flex items-center justify-center bottom-0">

        
      </div>
    <div className="grid gap-2 grid-cols-fluid bg-red-800 p-10">
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
    <div className="flex justify-center pb-10">
    <Link href={`/movieToday/page/${Number(page) + 1}`}>
          <span className="flex border border-4 w-fit  ">
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
          </span>
        </Link>
    </div>
    </div>
  );
};

export default Page;
