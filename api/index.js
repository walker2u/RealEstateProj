import express from 'express';
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
import listingRouter from './routes/listing.route.js'

dotenv.config();

const app = express();
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
mongoose.connect(process.env.MONGO).then(console.log("Connected to Db")).catch((err) => {
    console.log("error : ", err);
});

app.use('/api/user/', userRouter);
app.use('/api/auth/', authRouter);
app.use('/api/listing/', listingRouter);

app.use((err, req, res, next) => {
    const statusCode = err.status || 500;
    const message = err.message || "Internal server Error!";
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
});

app.listen(3000, () => {
    console.log("Server is Running on port 3000");
})