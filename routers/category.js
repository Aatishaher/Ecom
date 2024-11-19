const express = require('express');
const router = express.Router();
const category_module = require("../models/category");
const admin=require("../Helper/adminAuth");
const { error } = require('console');

router.get("/", async function (req, res) {
    try {
        const categoryList = await category_module.find();
        res.json(categoryList);
    }
    catch (err) {
        res.status(500).send("Internal Error");
    }

})

router.post("/",admin(), async function (req, res) {
    let category = new category_module({
        name: req.body.name,
        icon: req.body.icon,
        colour: req.body.colour,
        image: req.body.image
    })
    try {
        const newcat = await category.save();
        if (!newcat) {
            res.status(404).send("No category found");
        }
        res.status(200).json(newcat);
    }
    catch (err) {
        res.status(500).json({
            error: err,
            success: false
        });
    }
})

router.put("/:id",admin(), async function (req, res) {
    const cat = await category_module.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        icon: req.body.icon,
        colour: req.body.colour,
        image: req.body.image
    },
        {
            new: true
        });
    if (!cat) {
        return res.status(404).send("Not Updated");
    }
    res.status(200).send(cat);

})


router.get("/:id", async function (req, res) {

    try {
        const cat = await category_module.findById(req.params.id);
        if (!cat) {
            return res.status(404).send("Category not available");
        }
        res.status(200).send(cat);
    }
    catch (err) {
        res.status(500).json({
            error: err.message,
            success: false
        })
    }
})
router.delete("/:id",admin(), async function (req, res) {

    try {
        const deltedcat = await category_module.findByIdAndDelete(req.params.id);
        if (!deltedcat) {
            return res.status(404).send("Category not available");
        }
        res.status(200).send("Deleted");
    }
    catch (err) {
        res.status(500).json({
            error: err.message,
            success: false
        })
    }
})

module.exports = router