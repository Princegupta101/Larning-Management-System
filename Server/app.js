import cookieParser from 'cookie-parser';
import cors from 'cors';
import { config } from 'dotenv';
import express from 'express';
import morgan from 'morgan';

import errorMiddlware from './middlewares/error.middleware.js';
import courseRoutes from './routes/course.Routes.js'
import userRoutes from './routes/user.Routes.js'

config();

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin:[process.env.FRONTEND_URL],
    credentials:true
}));

app.use(cookieParser());

app.use(morgan('dev'));

app.use('/ping',function(req,res){
    res.send('Pong');
})

app.use('/api/v1/user', userRoutes)
app.use('/api/v1/course', courseRoutes)

app.all('*',(req,res)=>{
    res.status(404).send('OOPS!!  404 page not found ')
})
app.use(errorMiddlware);

export default app;