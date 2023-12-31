'use client'
import React, { useState,useEffect,FormEvent, } from 'react'
import axios from '../Confix_Axios'
import { useRouter } from 'next/navigation'
export default function page() {
  const router = useRouter()


  //useState 
  const [inputField,setInputField] = useState({
    userName : '',
    fullName : '',
    email : '',
    password : '',
    confirmPassword : ''
  })
  const [errors, setErrors] = useState<any>({});
  const [isTouchUsername,setIsTouchUsername] = useState(true);
  const [isTouchFullname,setIsTouchFullname,] = useState(true);
  const [isTouchEmail,setIsTouchEmail,] = useState(true);
  const [isTouchPassword,setIsTouchPassword,] = useState(true);
  const [isTouchConfirmPassword,setIsTouchConfirmPassword,] = useState(true);
  const [registrationSuccess,setRegistrationSuccess] = useState(false)
  const [registrationError,setRegistrationError] = useState(false)



// เก็บค่าในInputFieldเมื่อมีการเปลี่ยนแปลงตลอด
  const handleChange = (e:any) => {
    setInputField({ ...inputField, [e.target.name]: e.target.value });
  };


  useEffect(() => {
    // สร้างตัวแปรเก็บข้อผิดพลาด
    const errors:any = {};
  
    // ตรวจสอบความถูกต้องของชื่อผู้ใช้
    if (isTouchUsername === true && inputField.userName.length < 5) {
      errors.userName = 'Username must be at least 5 characters';
    }
  
    // ตรวจสอบความถูกต้องของชื่อเต็ม
    if (inputField.fullName.length < 8) {
      errors.fullName = 'Fullname must be at least 8 characters';
    }
  
    // ตรวจสอบความถูกต้องของอีเมล
    if (isTouchEmail === true && inputField.email.length < 8) {
      errors.email = 'Email must be at least 8 characters';
    }
  
    // ตรวจสอบความถูกต้องของรหัสผ่าน
    if (isTouchPassword === true) {
      const password = inputField.password;
      let isValid = true;
      // ตรวจสอบความยาวของรหัสผ่าน
      if (password.length < 8) {
        isValid = false;
      }
      // ตรวจสอบตัวพิมพ์ใหญ่
      if (!/[A-Z]/.test(password)) {
        isValid = false;
      }
      // ตรวจสอบตัวพิมพ์เล็ก
      if (!/[a-z]/.test(password)) {
        isValid = false;
      }
      // ตรวจสอบอักขระพิเศษ
      if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password)) {
        isValid = false;
      }
      if (!isValid) {
        errors.password = 'Password must be at least 8 characters and contain uppercase, special characters.';
      }
    }
  
    // ตรวจสอบความถูกต้องของการยืนยันรหัสผ่าน
    if (isTouchConfirmPassword === true && (inputField.confirmPassword !== inputField.password || inputField.confirmPassword.length === 0)) {
      errors.confirmPassword = 'Confirm Password Not Match';
    }
  
    // อัปเดตข้อผิดพลาด
    setErrors(errors);
  }, [inputField]);
  


  const handleSubmit = (e: FormEvent) => {
    e.preventDefault(); // ป้องกันการรีโหลดหน้าหลังจาก submit
    const body = {
      username: inputField.userName,
      fullname: inputField.fullName,
      email: inputField.email,
      password: inputField.password,
    };
    console.log(body)
    axios.post("/users/register", body)
    .then((response: any) => {
      // ทำงานเมื่อรับข้อมูลตอบกลับจากเซิร์ฟเวอร์
      console.log("Registration success:", response.data);
      setRegistrationSuccess(true)
      setTimeout(() => {
        router.push('/login')
      }, 1000);
    })
    .catch((error: any) => {
      // ดำเนินการเมื่อเกิดข้อผิดพลาดในการส่งคำขอหรือรับข้อมูลตอบกลับจากเซิร์ฟเวอร์
      console.error("Registration error:", error);
      setRegistrationError(true)
    });
};





  return (
    <div className="login bg-cover bg-repeat text-black ">
  <div className="h-screen flex flex-col justify-center items-center">
  <form className=""  method="POST" >
    {registrationSuccess ? (
      <h1 className="text-white text-center font-bold text-3xl mb-1">
      Register Success Fully welcome <p className='text-black text-center font-bold text-3xl mb-1'>{inputField.fullName}</p></h1> ) : (
      <h1 className="text-white text-center font-bold text-8xl mb-1">
      Register
      </h1>
      )}

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
            onChange={handleChange}        />
        </div>
        {isTouchUsername && errors.userName ? (
          <p className="error text-white text-sm mb-3">
            {errors.userName}
          </p>) : null}
          

        
        <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
				  <svg xmlns="http://www.w3.org/2000/svg" 
          className="h-12 w-12 text-gray-400" 
          viewBox="0 0 20 20"
					fill="currentColor">
					<path fillRule="evenodd" 
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
        />
         </div>
        {isTouchFullname && errors.fullName ? (
              <p className="error text-white text-sm mb-3">
                {errors.fullName}
              </p>
            ): null}

        <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
						<svg xmlns="http://www.w3.org/2000/svg" 
            className="h-12 w-12 text-gray-400" 
            fill="none"
						viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2"
						d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
						</svg>
						<input className="pl-2 outline-none border-none text-4xl" 
            type="email" 
            name="email" 
            id="email" 
            placeholder="Email Address" 
            value={inputField.email}
            onChange={handleChange}
            />
        </div>
        {isTouchEmail && errors.email ? (
          <p className="error text-white text-sm mb-3">
            {errors.email}
          </p>) : null}

        <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
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
          />
        </div>
        {isTouchPassword && errors.password ? (
          <p className="error text-white text-sm mb-3">
            {errors.password}
          </p>) : null}


        <div className="flex items-center border-2 py-2 px-3 rounded-2xl mt-4">
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
          />
        </div>
        {isTouchConfirmPassword && errors.confirmPassword ? (
          <p className="error text-white text-sm mt-3">
            {errors.confirmPassword}
          </p>) : null}
          <button
          type="button"
          onClick={handleSubmit} // เรียกใช้ handleSubmit เมื่อคลิกที่ปุ่ม
          className={`text-4xl block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2 ${
            Object.keys(errors).length === 0 ? '' : 'pointer-events-none opacity-50' }`}
        >
          Register now!
        </button>
      </form>      
        
    {registrationError ? (
      <h1 className="text-white text-center font-bold text-3xl mb-1">Username already taken </h1>) : (null
    )}
  </div>
</div>
  )
}