'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from './context/AuthContext';
import Movie from './movie'

const Page = () => {
  const router = useRouter();
  const { loggedIn, setLoggedIn } = useAuth();
  const [data, setData] = useState({ results: [] }); //แก้ปัญหา nullโดยการกำหนด results:[]
  const url = "https://api.themoviedb.org/3/movie/popular?api_key=72eef7bc29be08e73392ec8cc0b64c52";

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const jsonData = await response.json();
        setData(jsonData); // กำหนดข้อมูลใน state data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='bg-red-800 h-fit'>
    <div className='grid gap-2 grid-cols-fluid h-fit p-10'>
     {data.results.map( (movie:any) => 
     <Movie 
     key={movie.id}
     id={movie.id}
     title={movie.title}
     poster_path={movie.poster_path}
     />)}
    </div>

    </div>
  );
        }
export default Page;
