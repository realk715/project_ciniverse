"use client"
import React, { use, useEffect, useState } from 'react';
import Footer from '../Footer';
import Navbar from '../Header_Navbar';
import { useRouter } from 'next/navigation'
import axios from '../Confix_Axios'


export default function page() {
  
  const router = useRouter()
  const [values, setValues] = useState({
    username: '',
    password: '',
  });
  const [loginError,setLoginError] = useState(false)
  const [loginStatus, setLoginStatus] = useState(false);

  const handleChange = (e:any) => {setValues({
      ...values,[e.target.name]: e.target.value,
    });
  };

  
  const logIn = (e: React.FormEvent) => {
    e.preventDefault(); // ป้องกันการรีโหลดหน้าเว็บ
    const body = {
      username : values.username,
      password : values.password
    }
    console.log(body)
    axios.post('/users/login',body).
    then((response:any) => {
      if(response.data.message){
      console.log("Login success:", response.data.loggedIn);
      setLoginStatus(response.data.loggedIn);
      setTimeout(() => {
        router.push('/')
      }, 1000)
    }}).
    catch( (error : any) => {
      console.log("Login failed:", error.response.data.loggedIn);
      setLoginError(true)
      setLoginStatus(error.response.data.loggedIn);
    }
      )
    }




  return (
    <div className="login bg-cover bg-repeat text-black ">
        <Navbar/>
      <div className="h-screen flex flex-col justify-center items-center">
          <form className="" method="POST" onSubmit={logIn} >
            <h1 className="text-white font-bold text-8xl mb-1">Hello Again!</h1>
            <p className="text-4xl font-normal text-white mb-7">Welcome Back</p>
        
            <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                />
              </svg>
              <input
                className="pl-2 outline-none border-none text-4xl"
                type="text"
                name="username"
                value={values.username}
                onChange={handleChange}
                id=""
                placeholder="Username"

              />
            </div>
            <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <input
                className="pl-2 outline-none border-none text-4xl"
                type="password"
                name="password"
                onChange={handleChange}
                value={values.password}
                id=""
                placeholder="Password"
              />
            </div>
            
          {loginError? (<p className='text-2xl underline decoration-white text-white '>Wrong Username or Password</p>):
          null}            
          
          <button
              type="submit"
              className=" text-4xl block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
            >
              Login
            </button>
          </form>          
          <p className='text-white '>Guy you still don't have any account ? </p> 
          <a href="/register" className='text-xl text-white border-b border-red-500 transition-transform  hover:scale-150 '> Register here</a>
        </div>
        
      <div>
        <Footer />
      </div>
    </div>
  );
};

