"use client";
import React, { useState } from "react";
import Movie from "../movieToday/movie";

const Page = () => {
  const [inputField, setInputField] = useState({
    search: "",
  });
  const [data, setData] = useState({ results: [] });
  const [page, setPage] = useState<number>(1);
  const [searchTouch, setSearchTouch] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputField({ ...inputField, [e.target.name]: e.target.value });
  };

  const searchMovie = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${
          inputField.search
        }&api_key=72eef7bc29be08e73392ec8cc0b64c52&page=${1}`
      );
      const responseData = await response.json();
      if (responseData.results.length === 0) {
        setData({ results: [] });
        window.location.reload();
        console.log("Not found");
        setSearchTouch(false);

      } else {
        setData(responseData);
        setPage(1);
        console.log(page);
        setSearchTouch(true);

      }
    } catch (error) {
      console.error("Error fetching data:", error);
      window.location.reload();
      setSearchTouch(false);

    }
  };

  const nextSearch = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${
          inputField.search
        }&api_key=72eef7bc29be08e73392ec8cc0b64c52&page=${page + 1}`
      );
      const responseData = await response.json();
      if (responseData.results.length === 0) {
        setData({ results: [] });
        window.location.reload();
        console.log("Not found");
      } else {
        setData(responseData);
        setPage(page + 1);
        console.log(page);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      window.location.reload();
      console.log(page);
    }
  };

  const backSearch = async () => {
    try {
      if (page > 1) {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?query=${
            inputField.search
          }&api_key=72eef7bc29be08e73392ec8cc0b64c52&page=${page - 1}`
        );
        const responseData = await response.json();
        if (responseData.results.length === 0) {
          setData({ results: [] });
          window.location.reload();
          console.log("Not found");
        } else {
          setData(responseData);
          setPage(page - 1);
          console.log(page);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      window.location.reload();
      console.log(page);
    }
  };

  return (
    <div className="bg-red-800 min-h-screen ">
      <div className="p-4 w-6/12 ">
        <div className="relative ">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search Movie"
            name="search"
            value={inputField.search}
            onChange={handleChange}
          />
          <button
            className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={searchMovie}
          >
            Search
          </button>
        </div>
      </div>
      <div className="grid gap-2 grid-cols-fluid bg-red-800 p-10 ">
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
      {searchTouch ? (
        <div className="flex justify-center">
          {page < 2 ? (
            <button onClick={nextSearch}>
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
                    d="M3 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062A1.125 1.125 0 013 16.81V8.688zM12.75 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062a1.125 1.125 0 01-1.683-.977V8.688z"
                  />
                </svg>
                <span className="text-white text-4xl">NEXT</span>
              </div>
            </button>
          ) : (
            <div className="flex justify-center">
              <button onClick={backSearch}>
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
              </button>
              <button onClick={nextSearch}>
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
                      d="M3 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062A1.125 1.125 0 013 16.81V8.688zM12.75 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062a1.125 1.125 0 01-1.683-.977V8.688z"
                    />
                  </svg>
                  <span className="text-white text-4xl">NEXT</span>
                </div>
              </button>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default Page;
