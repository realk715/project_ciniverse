import { Request, Response } from 'express';
import User from '../model/user'; // อย่าลืมตรวจสอบชื่อและตำแหน่งของไฟล์ที่นำเข้า
import bcrypt from 'bcrypt'


//resgister

const registerUser = async (req: Request, res: Response) => {
    const targetUser = await User.findOne({ username: req.body.username });

    if (targetUser) {
        // มีผู้ใช้ 'username' นี้อยู่แล้ว
        console.log("Username already exists");
        res.status(500).json({ error: 'Username already exists' });
    } else {
        // ไม่พบผู้ใช้ 'username' นี้ในระบบ สามารถลงทะเบียนได้
        const newUser = await User.create({
            username:req.body.username,
            fullname:req.body.fullname,
            email:req.body.email,
            password:req.body.password,

        });
        console.log("Register Success!");
        res.status(201).json(newUser);
    }
}


//login

const loginUser = async (req: any, res: any) => {
    const { username, password } = req.body;

    User.findOne({ username: username }).then((user) => {
        if (user && user.password) {
            bcrypt.compare(password, user.password).then((match) => {
                if (match) {
                    // รหัสผ่านถูกต้อง
                    req.session.UserId = user._id;
                    res.status(200).send({
                        session: user._id,
                        message: "Login successful."
                    });
                    console.log('Login successful')
                } else {
                    // รหัสผ่านไม่ถูกต้อง
                    res.status(500).send({
                        session: null,
                        message: "Wrong username or password."
                    });
                    console.log('Login failed')
                }
            });
        } else {
            // ไม่พบผู้ใช้
            res.status(500).send({
                session: null,
                message: "User not found."
            });
        }
    });
}




export default {
    registerUser,
    loginUser
};
