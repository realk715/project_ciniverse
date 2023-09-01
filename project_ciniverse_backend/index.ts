import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import userRoutes from './routes/user'


const app = express();

mongoose.connect("mongodb+srv://admin:1234@cluster0.aiajm50.mongodb.net/?retryWrites=true&w=majority"),{
    useNewUrlParser: true,
    useUnifiedTopology: true,
};


app.use(cors());
app.use(express.json());
app.use(express.urlencoded())


app.use('/users', userRoutes);

app.listen(Number(process.env.PORT), () => {
    console.log(`Server is running at port ${process.env.PORT}`)

})