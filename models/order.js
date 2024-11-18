const mongoose= require('mongoose');
const orderSchema = mongoose.Schema({
    name: String,
    image: String,
    CountInstock: Number
})

module.exports=mongoose.model("order",orderSchema);