const express = require('express');
const router = express.Router();
const api = process.env.API_URL;
const product_module = require("../models/products");

router.get("/", async function (req, res) {
    try {
        const ProductList = await product_module.find();
        res.json(ProductList);
    }
    catch (err) {
        res.status(500).send("Internal Error");
    }

})

router.post("/", async function (req, res) {
    const prod = new product_module({
        name: req.body.name,
        image: req.body.image,
        CountInstock: req.body.CountInstock
    })
    try {
        const createdProduct = await prod.save();
        res.status(201).json(createdProduct);
    } catch (error) {
        res.status(500).json({ message: "Error creating product", error: error.message });
    }
})

module.exports=router;
