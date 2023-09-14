import { Request, Response } from 'express';
import User from '../model/user'; 
import bcrypt from 'bcrypt'
import jwt, { decode } from 'jsonwebtoken';

//resgister

const registerUser = async (req: any, res: any) => {
    const targetUser = await User.findOne({ username: req.body.username });

    if (targetUser) {
        // มีผู้ใช้ 'username' นี้อยู่แล้ว
        console.log("Username already exists");
        return res.status(500).json({ error: 'Username already exists' });
    } else {
        // ไม่พบผู้ใช้ 'username' นี้ในระบบ สามารถลงทะเบียนได้
        const newUser = await User.create({
            username:req.body.username,
            fullname:req.body.fullname,
            email:req.body.email,
            password:req.body.password,
        });
        console.log("Register Success!");
        return res.status(201).json(newUser);
    }
}


//login

const loginUser = async (req:any, res:any ,next:any) => {
    const { username, password } = req.body;
  
    try {
      const user = await User.findOne({ username: username });
  
      if (user && user.password) {
        const match = await bcrypt.compare(password, user.password);
  
        if (match) {
          // รหัสผ่านถูกต้อง       
          const newToken = jwt.sign(
            {
              id: user._id,
              permission: user.permission
            },
            'sunvoinwza007', 
            { expiresIn: '24h' } 
          );
          console.log(newToken);
          res.cookie('authorization',newToken,{
            httpOnly:true,
            expires:new Date(Date.now() + 24 * 60 * 60 * 1000),
            sameSite:'Strict'
          })          
          return res.status(200).json({
            token: newToken,
            message: "Login successful.",
            loggedIn: true,    
          });
            


        } else {
          // รหัสผ่านไม่ถูกต้อง
          console.log("Login failed");
          return res.status(500).json({
            token: null,
            message: "Wrong username or password.",
            loggedIn: false,
          });
        }
      } else {
        // ไม่พบผู้ใช้
        console.log("Login failed");
        return res.status(500).json({
          token: null,
          message: "Wrong username or password.",
          loggedIn: false,
        });
      }
    } catch (error) {
      console.error("Error during login:", error);
      return res.status(500).json({
        token: null,
        message: "An error occurred during login.",
        loggedIn: false,
      });
    }
  };


//check 
const checkLogin = async (req: any, res: any) => {
  const token = req.cookies.authorization; // ดึง Token จากคุกกี้

  if (token) {
      const decoded: any = jwt.verify(token, "sunvoinwza007");
      // ถ้า Token ถูกต้องและยังไม่หมดอายุ
      console.log('check login : true');
      return res.status(200).json({
        loggedIn: true,
        id: decoded.id,
        permission: decoded.permission
      });
  } else {
    // ถ้าไม่มี Token ในคุกกี้
    console.log('check login : false');
  }
};


//logout
const logoutUser = async (req: any, res: any) => {
  const token = req.cookies.authorization; // ดึง Token จากคุกกี้

  if (token) {
    // หากมี Token ในคุกกี้
    console.log('Logout successful');
    res.clearCookie('authorization'); // ลบคุกกี้ authorization
    return res.status(200).json({ message: "Logout successful" });
  } else {
    // ถ้าไม่มี Token ในคุกกี้
    console.log('Not logged in');
    return res.status(400).json({ message: "Not logged in" });
  }
};




export default {
    registerUser,
    loginUser,
    checkLogin,
    logoutUser,
};
