const express = require('express');
const router = express.Router();
const product_module = require("../models/products");
const category_module = require("../models/category");
const admin=require("../Helper/adminAuth");
const mongoose=require('mongoose');

router.get("/", async function (req, res) {
    try {
        const ProductList = await product_module.find();
        res.json(ProductList);
    }
    catch (err) {
        res.status(500).send("Internal Error");
    }
    res.status(200).json({ message: "Products route is working!" });

})
router.get("/:id", async function (req, res) {
    try {
        const Product = await product_module.findById(req.params.id);
        if (!Product) {
            return res.status(404).send("Product not found");
        }
        res.json(Product);
    }
    catch (err) {
        res.status(500).send("Internal Error");
    }

})

router.post("/",admin(), async function (req, res) {
    const category = await category_module.findById(req.body.category);
    if (!category) {
        return res.status(404).send("category not found");
    }
    const prod = new product_module({
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: req.body.image,
        images: req.body.images,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        CountInstock: req.body.CountInstock,
        rating: req.body.rating,
        numberReview: req.body.numberReview,
        isFeatured: req.body.isFeatured,
        date: req.body.date
    })
    try {
        const createdProduct = await prod.save();
        if (!createdProduct) {
            return res.status(404).send("not created");
        }
        res.status(200).send(createdProduct);
    }
    catch (err) {
        res.status(500).json({
            error: err,
            sucess: true
        })
    }


})
router.put('/:id',admin(), async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).send('Invalid Product Id')
    }
    const category = await Category.findById(req.body.category);
    if (!category) return res.status(400).send('Invalid Category')

    const product = await product_module.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            description: req.body.description,
            richDescription: req.body.richDescription,
            image: req.body.image,
            brand: req.body.brand,
            price: req.body.price,
            category: req.body.category,
            countInStock: req.body.countInStock,
            rating: req.body.rating,
            numReviews: req.body.numReviews,
            isFeatured: req.body.isFeatured,
        },
        { new: true }
    )

    if (!product)
        return res.status(500).send('the product cannot be updated!')

    res.send(product);
})

router.delete('/:id',admin(), (req, res)=>{
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).send('Invalid Product Id')
    }
    product_module.findByIdAndDelete(req.params.id).then(product =>{
        if(product) {
            return res.status(200).json({success: true, message: 'the product is deleted!'})
        } else {
            return res.status(404).json({success: false , message: "product not found!"})
        }
    }).catch(err=>{
       return res.status(500).json({success: false, error: err}) 
    })
})

router.get(`/get/count`, async (req, res) =>{
    const productCount = await Product.countDocuments((count) => count)

    if(!productCount) {
        res.status(500).json({success: false})
    } 
    res.send({
        productCount: productCount
    });
})



module.exports = router;
