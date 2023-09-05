/// <reference path="globals.d.ts" />
declare global {
    var loggedIn: string | null;
  }
  
  import dotenv from 'dotenv';
  dotenv.config();
  import express from 'express';
  import mongoose from 'mongoose';
  import cors from 'cors';
  import userRoutes from './routes/user'
  import expressSession from 'express-session'
  
  const app = express();
  
  //Mongo connection
  mongoose.connect("mongodb+srv://admin:1234@cluster0.aiajm50.mongodb.net/?retryWrites=true&w=majority"),{
      useNewUrlParser: true,
      useUnifiedTopology: true,
  };
  
  global.loggedIn = null;
  
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(expressSession({
      secret: "sunvoinwza007",
      resave: false,
      saveUninitialized: true,
  }));
  
  app.use("*",(req:any,res:any,next) => {
      global.loggedIn = req.session.userId
      next()
  })
  
  app.use('/users', userRoutes);
  
  app.listen(Number(process.env.PORT), () => {
      console.log(`Server is running at port ${process.env.PORT}`)
  })
  