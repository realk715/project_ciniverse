import { Request, Response } from 'express';
import User from '../model/user'; // อย่าลืมตรวจสอบชื่อและตำแหน่งของไฟล์ที่นำเข้า
import bcrypt from 'bcrypt'


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

const loginUser = async (req:any, res:any) => {
    const { username, password } = req.body;
  
    try {
      const user = await User.findOne({ username: username });
  
      if (user && user.password) {
        const match = await bcrypt.compare(password, user.password);
  
        if (match) {
          // รหัสผ่านถูกต้อง
          req.session.UserId = user._id;
          req.session.loggedIn= true
          console.log("Login successful");
          return res.status(200).json({
            session: user._id,
            message: "Login successful.",
            loggedIn: true,
          });
        } else {
          // รหัสผ่านไม่ถูกต้อง
          console.log("Login failed");
          req.session.loggedIn= false
          req.session.UserId = null

          return res.status(500).json({
            session: null,
            message: "Wrong username or password.",
            loggedIn: false,
          });
        }
      } else {
        // ไม่พบผู้ใช้
        console.log("Login failed");
        req.session.loggedIn= false
        req.session.UserId = null

        return res.status(500).json({
          session: null,
          message: "Wrong username or password.",
          loggedIn: false,
        });
      }
    } catch (error) {
      req.session.loggedIn= false
      req.session.UserId = null
      console.error("Error during login:", error);
      return res.status(500).json({
        session: null,
        message: "An error occurred during login.",
        loggedIn: false,
      });
    }
  };


  //check 
const checkLogin = async (req:any,res:any) => {
    if (req.session.loggedIn) {
        return res.json({ loggedIn: true });
      } else {
        return res.json({ loggedIn: false });
      }
    };

//logout
const logoutUser = async (req:any, res:any) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      // ส่งการตอบสนองว่าล็อกเอาท์สำเร็จ
      console.log('Logout successful')
      return res.status(200).json({ message: "Logout successful" });
    });
  } else {
    // ไม่ได้ล็อกอินอยู่แล้ว
    console.log('Not logged in')
    return res.status(400).json({ message: "Not logged in" });

  }
};



export default {
    registerUser,
    loginUser,
    checkLogin,
    logoutUser,
};
