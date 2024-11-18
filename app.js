require('dotenv/config')
const express = require('express');
const app = express();
const api = process.env.API_URL;
const productRouter = require("./routers/products")
const bodyparser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log("Database connected")
    })
    .catch((error) => {
        console.log(error);
    })

app.use(`${api}/products`, productRouter);


app.use(bodyparser.json());



app.listen(3000, () => {
    console.log("listing on 3000");
})