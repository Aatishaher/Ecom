const express = require('express');
const router = express.Router();
const user_module = require("../models/user");

router.get("/", async function (req, res) {
    try {
        const UserList = await user_module.find();
        res.json(UserList);
    }
    catch (err) {
        res.status(500).send("Internal Error");
    }
})
router.post("/", async function (req, res) {
    const prod = new user_module({
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