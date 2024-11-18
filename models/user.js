const mongoose= require('mongoose');
const userSchema = mongoose.Schema({
    name: String,
    image: String,
    CountInstock: Number
})

module.exports=mongoose.model("user",userSchema);