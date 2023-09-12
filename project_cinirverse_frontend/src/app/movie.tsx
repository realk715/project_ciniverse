import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

type Props = {
    key:string;
    id:string;
    title:string;
    poster_path:string;

}

export default function movie({id,title,poster_path}: Props) {
    const img ="https://image.tmdb.org/t/p/original";


  return (
    <div className='bg-gray-600 border-solid border-2'>
        <h2 className='text-white text-center text-xl'> {title}</h2>
        <p></p>
        <Link href={`/movie/${id}`}>
        <Image className='hover:opacity-70' alt='poster_img' src={img+poster_path}
        width={400} height={400}
        />
        </Link>

    </div>
  )
}