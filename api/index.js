import express from 'express';

const app = express();

app.get("/", (req, res) => {
    res.json({ "message": "Hi Mayank!" });
})

app.listen(3000, () => {
    console.log("Server is Running on port 3000");
})