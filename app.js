require('dotenv/config');
const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const Auth=require("./Helper/userAuth");
const cors=require('cors');
const app = express();
const api = process.env.API_URL;

// Route imports
const productRouter = require("./routers/products");
const categoryRouter = require("./routers/category");
const userRouter = require("./routers/user");
const ordersRouter = require("./routers/order");

// Middleware to parse JSON
app.use(bodyparser.json()); // Must come before the routes
app.use(cors());
app.options('*',cors);


// Route middlewar
app.use(`${api}/products`,Auth(), productRouter);
app.use(`${api}/category`, categoryRouter);
app.use(`${api}/user`, userRouter);
app.use(`${api}/orders`, ordersRouter);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log("Database connected");
    })
    .catch((error) => {
        console.error("Database connection failed:", error.message);
    });

// Default route for invalid paths
app.use((req, res, next) => {
    res.status(404).json({ message: "Route not found" });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
