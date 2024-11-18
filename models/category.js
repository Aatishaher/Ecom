const mongoose= require('mongoose');
const categorySchema = mongoose.Schema({
    name: String,
    image: String,
    CountInstock: Number
})

module.exports=mongoose.model("category",categorySchema);