import mongoose from "mongoose";
import bcrypt from "bcrypt";
const Schema = mongoose.Schema

const UserSchema = new Schema ({
    username: {
        type : String,
        require :[true,'Please provide Username']
    },
    fullname : {
        type : String,
        require :[true, 'Please provide Password']
    },
    email : {
        type : String,
        require : [true,'Please provide email']
    },
    password : {
        type : String, 
        require : [true , 'please provide password']
    },
    permission : {
        type : String,
        default : "user"
    }
    
})

UserSchema.pre('save', function(next) {
    const user = this;

    // ตรวจสอบว่า user และ user.password ไม่เป็น undefined
    if (user && user.password) {
        bcrypt.hash(user.password, 12).then((hash: string) => {
            user.password = hash;
            next();
        }).catch((err: Error) => {
            console.log(err);
            next(err); // ส่ง error ไปยัง middleware ถัดไป (ถ้ามี)
        });
    } else {
        next(); // กรณี user หรือ user.password เป็น undefined ให้เรียก next() เพื่อให้โปรเซสตัวถัดไป
    }
});


const User = mongoose.model('User', UserSchema)
export default User;

