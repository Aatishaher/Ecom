const express = require('express');
const router = express.Router();
const orders_module = require("../models/order");

router.get("/", async function (req, res) {
    try {
        const ordersList = await orders_module.find();
        res.json(ordersList);
    }
    catch (err) {
        res.status(500).send("Internal Error");
    }

})
module.exports=router