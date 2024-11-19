const express = require('express');
const router = express.Router();
const user_module = require("../models/user");
const bcrypt=require('bcrypt');



router.get("/", async function (req, res) {
    try {
        const UserList = await user_module.find();
        res.json(UserList);
    }
    catch (err) {
        res.status(500).send("Internal Error");
    }
})
router.post('/', async (req,res)=>{
    let user = new user_module({
        name: req.body.name,
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.password, 10),
        phone: req.body.phone,
        isAdmin: req.body.isAdmin,
        street: req.body.street,
        apartment: req.body.apartment,
        zip: req.body.zip,
        city: req.body.city,
        country: req.body.country,
    })
    user = await user.save();

    if(!user)
    return res.status(400).send('the user cannot be created!')

    res.send(user);
})



module.exports=router;