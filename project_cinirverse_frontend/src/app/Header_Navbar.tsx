import React, { useState } from 'react';

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  


  return (
    <header className='flex justify-between bg-black sticky top-0  '>
      <div>
      <button className='show' onClick={toggleSidebar}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className='w-8 h-8 hover:stroke-red-600 mt' >
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
        </svg>
      </button>
      </div>


      <div className={`sidebar bg-black space-y-6 py-7 px-2 fixed inset-y-0 left-0 transform ${sidebarOpen ? '' : '-translate-x-full'} transition duration-200 ease-in-out w-3/12 h-auto`} >
        <nav>
          <div className='block py-2.5 px-4'>
            <div className='flex justify-between	 '>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" className='w-6 h-6 hover:fill-white'>
              <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
            </svg>
            <button onClick={toggleSidebar}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="red" className="w-6 h-6 hover:fill-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
            </div>
          </div>
          <a href="/" className='hover:bg-red-600 text-white block py-2.5 px-4'>Home</a>
          <a href="/register" className='hover:bg-red-600 text-white block py-2.5 px-4'>Register</a>
          <a href="login" className='hover:bg-red-600 text-white block py-2.5 px-4'>Login</a>
          <a href="#" className='hover:bg-red-600 text-white block py-2.5 px-4'>Movie Today</a>
          <a href="#" className='hover:bg-red-600 text-white block py-2.5 px-4'>Search Movie</a>
          <div className='  text-white block py-2.5 px-4 '>
          <button>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="red" className="w-6 h-6 hover:stroke-white">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
          </svg>
          </button>
          </div>
        </nav>
      </div>
    

      <div className='flex'>
      <h2 className='text-white text-4xl'> Ciniverse</h2>
      <svg className='hover:animate-spin-slow' width="50px" height="50px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M9.10354 12.7842C9.04118 12.6764 8.98253 12.5659 8.92762 12.4529C8.30132 11.1645 8.11552 9.50716 8.34394 7.8948C8.79854 4.68585 10.9957 1.25 15.3115 1.25C15.7257 1.25 16.0615 1.58579 16.0615 2C16.0615 2.41421 15.7257 2.75 15.3115 2.75C12.0274 2.75 10.2245 5.31415 9.82911 8.1052C9.73795 8.7487 9.72706 9.38252 9.78821 9.97316C10.3366 9.37501 11.1245 9 12 9C12.9663 9 13.8258 9.45681 14.3745 10.1663C14.7911 10.5458 15.128 11.0207 15.3839 11.5471C16.0102 12.8355 16.196 14.4928 15.9676 16.1052C15.513 19.3142 13.3158 22.75 9 22.75C8.58579 22.75 8.25 22.4142 8.25 22C8.25 21.5858 8.58579 21.25 9 21.25C12.2842 21.25 14.087 18.6858 14.4824 15.8948C14.5912 15.1267 14.5857 14.3725 14.4798 13.689C13.9396 14.4804 13.0305 15 12 15C10.6145 15 9.44832 14.0607 9.10354 12.7842Z" fill="red"/>
          <g opacity="0.8">
          <path d="M13.25 12C13.25 12.8871 12.7399 13.5765 11.7971 14.0348C10.8355 14.5023 9.49284 14.679 8.1052 14.4824C5.31415 14.087 2.75 12.2842 2.75 9C2.75 8.58579 2.41421 8.25 2 8.25C1.58579 8.25 1.25 8.58579 1.25 9C1.25 13.3158 4.68585 15.513 7.8948 15.9676C9.50716 16.196 11.1645 16.0102 12.4529 15.3839C13.7601 14.7485 14.75 13.6129 14.75 12C14.75 11.5858 14.4142 11.25 14 11.25C13.5858 11.25 13.25 11.5858 13.25 12Z" fill="white"/>
          <path d="M10.75 12.3115C10.75 11.4244 11.2601 10.735 12.2029 10.2767C13.1645 9.80922 14.5072 9.63253 15.8948 9.82911C18.6858 10.2245 21.25 12.0274 21.25 15.3115C21.25 15.7257 21.5858 16.0615 22 16.0615C22.4142 16.0615 22.75 15.7257 22.75 15.3115C22.75 10.9957 19.3141 8.79854 16.1052 8.34394C14.4928 8.11552 12.8355 8.30132 11.5471 8.92762C10.2399 9.56307 9.25 10.6986 9.25 12.3115C9.25 12.7257 9.58578 13.0615 10 13.0615C10.4142 13.0615 10.75 12.7257 10.75 12.3115Z" fill="white"/>
          </g>
      </svg>
      </div>
      
      <div className='flex'>
        <button><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" className="w-6 h-6 ml-3 hover:stroke-red-600 ">
          <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
