"use client"
import React, { useState,useEffect } from 'react'
import Navbar from '../Header_Navbar'
import Footer from '../Footer'


export default function page() {
  //useState 
  const [inputField,setInputField] = useState({
    userName : "",
    fullName : "",
    email : "",
    password : "",
    confirmPassword : ""
  })
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [isTouchUsername,setIsTouchUsername] = useState(false);
  const [isTouchFullname,setIsTouchFullname,] = useState(false);
  const [isTouchEmail,setIsTouchEmail,] = useState(false);
  const [isTouchPassword,setIsTouchPassword,] = useState(false);
  const [isTouchConfirmPassword,setIsTouchConfirmPassword,] = useState(false);
  

// เก็บค่าในInputFieldเมื่อมีการเปลี่ยนแปลงตลอด
  const handleChange = (e:any) => {
    setInputField({ ...inputField, [e.target.name]: e.target.value });
  };


  //validate from
  useEffect(() => {
    if (isTouchUsername === true) {
      if (inputField.userName.length < 5) {
        setErrors({ userName: 'Username must be at least 5 characters ' });
      } else {
        setErrors({});
      }
    }
  }, [inputField.userName, isTouchUsername]);

  useEffect(() => {
    if (isTouchFullname === true) {
      if (inputField.fullName.length < 8) {
        setErrors({ fullName: 'Fullname must be at least 8 characters ' });
      } else {
        setErrors({});
      }
    }
  }, [inputField.fullName, isTouchFullname]);

  useEffect(() => {
    if (isTouchEmail === true) {
      if (inputField.email.length < 8 ) {
        setErrors({ email: 'email must be at least 8 characters ' });
      } else {
        setErrors({});
      }
    }
  }, [inputField.email, isTouchEmail]);

  useEffect(() => {
    if (isTouchPassword === true) {
      const password = inputField.password;
      let isValid = true;
  
      // ตรวจสอบว่ารหัสผ่านมีความยาวอย่างน้อย 8 ตัวอักษร
      if (password.length < 8) {
        isValid = false;
      }
  
      // ตรวจสอบว่ารหัสผ่านมีตัวพิมพ์ใหญ่ (uppercase)
      if (!/[A-Z]/.test(password)) {
        isValid = false;
      }
  
      // ตรวจสอบว่ารหัสผ่านมีตัวพิมพ์เล็ก (lowercase)
      if (!/[a-z]/.test(password)) {
        isValid = false;
      }
  
      // ตรวจสอบว่ารหัสผ่านมีอักขระพิเศษ (special characters)
      if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password)) {
        isValid = false;
      }
  
      if (isValid) {
        setErrors({});
      } else {
        setErrors({ password: 'Password must be at least 8 characters  and contain uppercase,special characters.' });
      }
    }
  }, [inputField.password, isTouchPassword]);
  

  useEffect(() => {
    if (isTouchConfirmPassword === true) {
      if (inputField.confirmPassword !== inputField.password ) {
        setErrors({ confirmPassword: 'Confirm Password Not Match ' });
      } else {
        setErrors({});
      }
    }
  }, [inputField.confirmPassword, isTouchConfirmPassword]);



  //เมื่อกดsubmitจะเรียกใช้ฟังชั่นนี้ทันทีและsetSubmittingเป็นtrueไปเลย
  const handleSubmit = (event:any) => {
    event.preventDefault();
    setSubmitting(true);
  };


  const finishSubmit = () => {
    console.log(inputField);
  };

  
  //ใช้useEffect เช็คว่าในerrorsมีerrorsไหมและ submittingเป็นtrue หรือยัง
  //ถ้าเป็นแล้วให้ไปเรียก finishSubmit
  useEffect(() => {
    if (Object.keys(errors).length === 0 && submitting) {
      finishSubmit();
    }
  }, [errors, submitting]);




  return (
    <div className="login bg-cover bg-repeat text-black ">
    <Navbar/>
  <div className="h-screen flex flex-col justify-center items-center">
      <form className="" onSubmit={handleSubmit}  >
        <h1 className="text-white text-center font-bold text-8xl mb-1">Register</h1>
        <p className="text-xl font-normal text-center text-white mt-7 mb-7">Create your account .It's free and takes 30seconds!</p>
    
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
            name="userName"
            id="userName"
            placeholder="Username"
            value={inputField.userName}
            onChange={handleChange}
            onBlur={() => setIsTouchUsername(false)}
            onFocus={() => setIsTouchUsername(true)}             />
        </div>
        {isTouchUsername && errors.userName ? (
          <p className="error text-white text-sm">
            {errors.userName}
          </p>) : null}
          

        
        <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
				  <svg xmlns="http://www.w3.org/2000/svg" 
          className="h-12 w-12 text-gray-400" 
          viewBox="0 0 20 20"
					fill="currentColor">
					<path fill-rule="evenodd" 
          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
						clip-rule="evenodd" />
				  </svg>
				<input className="pl-2 outline-none border-none text-4xl" 
        type="text" 
        name="fullName" 
        id="fullName" 
        placeholder="Full name" 
        value={inputField.fullName}
        onChange={handleChange} 
        onBlur={() => setIsTouchFullname(false)}
        onFocus={() => setIsTouchFullname(true)}
        />
         </div>
        {isTouchFullname && errors.fullName ? (
              <p className="error text-white text-sm">
                {errors.fullName}
              </p>
            ): null}

        <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
						<svg xmlns="http://www.w3.org/2000/svg" 
            className="h-12 w-12 text-gray-400" 
            fill="none"
						viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" 
            stroke-linejoin="round" 
            stroke-width="2"
						d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
						</svg>
						<input className="pl-2 outline-none border-none text-4xl" 
            type="email" 
            name="email" 
            id="email" 
            placeholder="Email Address" 
            value={inputField.email}
            onChange={handleChange}
            onBlur={() => setIsTouchEmail(false)}
            onFocus={() => setIsTouchEmail(true)}
            />
        </div>
        {isTouchEmail && errors.email ? (
          <p className="error text-white text-sm">
            {errors.email}
          </p>) : null}

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
            id="password"
            placeholder="Password"
            value={inputField.password}
            onChange={handleChange}
            onBlur={() => setIsTouchPassword(false)}
            onFocus={() => setIsTouchPassword(true)}
          />
        </div>
        {isTouchPassword && errors.password ? (
          <p className="error text-white text-sm">
            {errors.password}
          </p>) : null}


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
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Confirm Password"
            value={inputField.confirmPassword}
            onChange={handleChange}
            onBlur={() => setIsTouchConfirmPassword (false)}
            onFocus={() => setIsTouchConfirmPassword (true)}
          />
        </div>
        {isTouchConfirmPassword && errors.confirmPassword ? (
          <p className="error text-white text-sm">
            {errors.confirmPassword}
          </p>) : null}
        <button
          type="submit"
          className=" text-4xl block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
        >
          Register now!
        </button>
      </form>          
    </div>
    
  <div>
    <Footer />
  </div>
</div>
  )
}