const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    precio: {
        type: Number,
        require: true
    },
    image: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    stock: {
        type: Number,
        require: true
    }
})

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;