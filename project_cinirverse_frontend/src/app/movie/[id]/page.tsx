import React from 'react'
import Image from 'next/image';
type Props = {
  params:string;
}

export default  async function page({params}: Props) {
  const { id } = params;
  const img ="https://image.tmdb.org/t/p/original";
  const url = `https://api.themoviedb.org/3/movie/${id}?api_key=72eef7bc29be08e73392ec8cc0b64c52`;
  const response = await fetch(url,{next :{revalidate:60}}); //ครบ60วิ clear cache 
  const data = await response.json()
  console.log(data.title)
  return (
  <div
  style={{ backgroundImage: `url(${img + data.backdrop_path})` }}
  className="bg-no-repeat bg-cover bg-center w-full h-full"
  >
      <h2 className='text-center'>{data.title}</h2>
      <div className='flex'>
      <Image className='' alt='img'
      src={img+data.poster_path}
      width={400}
      height={400}
      />
      </div>
      <a className='ml-4'  href={`${data.homepage}`}> Website</a>
      <p>original Language {data.original_language}</p>

    </div>
  )
}