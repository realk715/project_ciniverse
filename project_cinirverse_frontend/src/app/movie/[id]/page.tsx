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
  style={{ backgroundImage: `url(${img + data.backdrop_path})`,opacity:1 }}
  className="bg-no-repeat bg-cover bg-center w-full h-full  ">

      <div className='flex justify-center h-screen w-screen h-fit	'>
      <div className='w-6/12 h-12/12'>
      <Image style={{opacity:1}}  className=''  alt='img'
      src={img+data.poster_path}
      height={2000}
      width={2000}
      />
      </div>
      <div className='p-4 list-none bg-black text-white w-6/12 	  '>
      <h2 className=' text-4xl'>Movie Name :{data.title}</h2>
      <br />
  
      <a  className='border border-red-600 text-2xl  text-red-600   ' target='_blank' href={`${data.homepage}`}> Website </a>
      <br />
      <br />
      <span className='text-3xl border'>Overview</span>
      <br />
      <br />
      <p className='text-xl'> {data.overview}</p>
      <p className='text-xl'>"{data.tagline}"</p>
      <br />
      <span className='text-2xl border'> genres</span>
      <br />
      <br />
      {data.genres.map((genre:any) => (
      <li  key={genre.id}>{genre.name}</li>
    ))}
    <br />
    <span className='text-xl border'>Production Companies</span>
    <br />
    <br />
    {data.production_companies.map((production_companies:any) => (
      <li key={production_companies.id}>{production_companies.name}</li>
    ))}
    <br />
  <p className='text-xl border-b responsive-data'>Budget : {data.budget} $</p>
  <p className='text-xl border-b responsive-data'>Popularity: {data.popularity}</p>
  <p className='text-xl border-b responsive-data'>Release Date: {data.release_date}</p>
  <p className='text-xl border-b responsive-data'>Revenue: {data.revenue} $</p>
  <p className='text-xl border-b responsive-data'>Run Time: {data.runtime} Mins</p>
  <p className='text-xl border-b responsive-data'>Vote: {data.vote_average}</p>
  <p className='text-xl border-b responsive-data'>Vote Count: {data.vote_count}</p>

      </div>
      </div>

    </div>
  )
}