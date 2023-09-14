'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import axios from '../Confix_Axios';
import Movie from './movie'
import Link from 'next/link';
const Page = () => {
  const router = useRouter();
  const { loggedIn, setLoggedIn } = useAuth();
  const [data, setData] = useState({ results: [] }); //แก้ปัญหา nullโดยการกำหนด results:[]
  const [page,setPage] = useState<number>(1)
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=72eef7bc29be08e73392ec8cc0b64c52&page=${page}`;

  useEffect(() => {


    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const jsonData = await response.json();
        setData(jsonData); // กำหนดข้อมูลใน state data
        setPage(jsonData.page)
        console.log(`${page} อิอิ`)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='grid gap-2 grid-cols-fluid bg-red-800'>
<Link href={`/movieToday/page/${page - 1}`}>
        <p className='text-white'> Back</p>
      </Link>     {data.results.map( (movie:any) => 
     <Movie 
     key={movie.id}
     id={movie.id}
     title={movie.title}
     poster_path={movie.poster_path}
     page={page}

     />)}
     <Link href={`/movieToday/page/${page + 1}`}>
        <p className='text-white'> Next</p>
      </Link>
    </div>
  );
        }
        
export default Page;
