const mongoose= require('mongoose');
const productSchema = mongoose.Schema({
    name: String,
    image: String,
    CountInstock: Number
})

module.exports=mongoose.model("product",productSchema);