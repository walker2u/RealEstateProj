import express from 'express';
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config();

const app = express();
mongoose.connect(process.env.MONGO).then(console.log("Connected to Db")).catch((err) => {
    console.log("error : ", err);
});

app.get("/", (req, res) => {
    res.json({ "message": "Hi Mayank!" });
})

app.listen(3000, () => {
    console.log("Server is Running on port 3000");
})