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
    <div>
      <h2 className=''>{data.title}</h2>
      <Image alt='img'
      src={img+data.poster_path}
      width={400}
      height={400}
      />
    </div>
  )
}