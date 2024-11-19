require('dotenv/config');
const express = require('express');
const router = express.Router();
const user_module = require("../models/user");
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const Auth=require("../Helper/userAuth")


router.get("/",Auth(), async function (req, res) {
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

router.post("/login",async (req,res)=>{
    const user=await user_module.findOne({email:req.body.email});
    if(!user){
        return res.status(404).send("Result not found");
    }
    if(user && bcrypt.compareSync(req.body.password,user.passwordHash)){
        const token = jwt.sign(
            {email: user.email,isAdmin: user.isAdmin }, // Payload
            process.env.JWTPass, // Secret key
            { expiresIn: '1h' } // Token will expire in 1 hour
          );
          

        return res.status(200).send(user.email+","+token);
    }
    return res.status(404).send("incorrect password");
})



module.exports=router;