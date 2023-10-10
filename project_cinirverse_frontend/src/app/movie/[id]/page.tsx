"use client";
import React from "react";
import Image from "next/image";
import { useAuth } from "../../context/AuthContext";

type Props = {
  params: any;
};

export default async function page({ params }: Props) {
  const { token, setToken } = useAuth();
  const { id } = params;
  const img = "https://image.tmdb.org/t/p/original";
  const url = `http://localhost:8000/movies/?id=${id}`;
  const response = await fetch(url, { headers: { token: token } }); //ครบ60วิ clear cache
  const data = await response.json();
  console.log(token)
  console.log(data.title);
  return (
    <div>
      {data.length > 0 ? (
        <div
          style={{
            backgroundImage: `url(${img + data.backdrop_path})`,
            opacity: 1,
          }}
          className="bg-no-repeat bg-cover bg-center w-full h-full  "
        >
          <div className="flex justify-center  w-screen h-fit	">
            <div className="w-6/12 h-12/12">
              <Image
                style={{ opacity: 1 }}
                className=""
                alt="img"
                src={img + data.poster_path}
                height={2000}
                width={2000}
              />
            </div>
            <div className="p-4 list-none bg-black text-white w-6/12  	  ">
              <h2 className=" text-4xl">Movie Name :{data.title}</h2>
              <br />

              <a
                className="border border-red-600 text-2xl  text-red-600   "
                target="_blank"
                href={`${data.homepage}`}
              >
                {" "}
                Website{" "}
              </a>
              <br />
              <br />
              <span className="text-3xl border">Overview</span>
              <br />
              <br />
              <p className="text-xl"> {data.overview}</p>
              <p className="text-xl">"{data.tagline}"</p>
              <br />
              <span className="text-2xl border"> genres</span>
              <br />
              <br />
              {data.genres.map((genre: any) => (
                <li key={genre.id}>{genre.name}</li>
              ))}
              <br />
              <span className="text-xl border">Production Companies</span>
              <br />
              <br />
              {data.production_companies.map((production_companies: any) => (
                <li key={production_companies.id}>
                  {production_companies.name}
                </li>
              ))}
              <br />
              <p className="text-xl border-b responsive-data">
                Budget : {data.budget}$
              </p>
              <p className="text-xl border-b responsive-data">
                Popularity: {data.popularity}
              </p>
              <p className="text-xl border-b responsive-data">
                Release Date: {data.release_date}
              </p>
              <p className="text-xl border-b responsive-data">
                Revenue: {data.revenue} $
              </p>
              <p className="text-xl border-b responsive-data">
                Run Time: {data.runtime} Mins
              </p>
              <p className="text-xl border-b responsive-data">
                Vote: {data.vote_average}
              </p>
              <p className="text-xl border-b responsive-data">
                Vote Count: {data.vote_count}
              </p>
            </div>
          </div>
        </div>
      ) :<p className="text-4xl border-b responsive-data text-center">
        Please Login
    </p> }
    </div>
  );
}
