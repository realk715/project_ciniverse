// /// <reference path="globals.d.ts" />
// declare global {
//     var loggedIn: string | null;
//   }
  import dotenv from 'dotenv';
  dotenv.config();
  import express from 'express';
  import mongoose from 'mongoose';
  import cors from 'cors';
  import userRoutes from './routes/user'
  import session from 'express-session'
  import bodyParser from 'body-parser';
  import cookieParser from 'cookie-parser'

  const app = express();
  
  //Mongo connection
  mongoose.connect("mongodb+srv://admin:1234@cluster0.aiajm50.mongodb.net/?retryWrites=true&w=majority"),{
      useNewUrlParser: true,
      useUnifiedTopology: true,
  };
  
  // global.loggedIn = null;
  
  app.use(cors({
    origin: 'http://localhost:3000', // กำหนดโดเมนของ React ที่พอร์ต 3000
    methods: ["get","post"],
    credentials: true, // อนุญาตการส่งคุกกี้ไปยังเซิร์ฟเวอร์ Node.js
  }));
  app.use(express.json());
  app.use(cookieParser())
  app.use(express.urlencoded({extended:true}));
  app.use(bodyParser.urlencoded({extended:true}));
  app.use(bodyParser.json());

  app.use(session({
    secret: 'sunvoinwza007',
    resave: false,
    saveUninitialized: true,
    cookie:{
        expires:new Date(Date.now() + 24 * 60 * 60 * 1000),
        },
    })
  )

  


  
  app.use('/users', userRoutes);

  app.listen(Number(process.env.PORT), () => {
      console.log(`Server is running at port ${process.env.PORT}`)
  })
  