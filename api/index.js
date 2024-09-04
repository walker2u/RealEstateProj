import express from 'express';
import mongoose from 'mongoose'
import dotenv from 'dotenv'

import userRouter from './routes/user.route.js'

dotenv.config();

const app = express();
mongoose.connect(process.env.MONGO).then(console.log("Connected to Db")).catch((err) => {
    console.log("error : ", err);
});

app.use('/api/user/', userRouter);

app.listen(3000, () => {
    console.log("Server is Running on port 3000");
})