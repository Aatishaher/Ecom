const express = require('express');
const router = express.Router();
const category_module = require("../models/category");

router.get("/", async function (req, res) {
    try {
        const categoryList = await category_module.find();
        res.json(categoryList);
    }
    catch (err) {
        res.status(500).send("Internal Error");
    }

})
module.exports=router