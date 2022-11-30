const Product = require("../models/productSchema");
const upload = require('../utils/multer');
const cloudinary = require("cloudinary").v2;


const getAllProducts = async (req, res) => {
    const products = await Product.find();
    try {
        if(products.length === 0) {
            return res.status(404).json({
                mensaje: "productos no encontrados"
            })
        }
        return res.status(200).json({
            mensaje:"productos encontrados",
            products
        })
    } catch (error) {
        console.log(error)
    }
}

const createProduct = async (req, res) => {
    const { name, precio, description, stock } = req.body;
    const { path } = req.file;
    const productExist = await Product.findOne({name});
    const cloudImg = await cloudinary.uploader.upload(path);
    //console.log("cloudImg", cloudImg)
    console.log("req.file", req.file)
    try {
        if(productExist) {
            return res.status(400).json({
                mensaje: "producto ya existe"
            })
        }

        const newProduct = new Product({
            name,
            precio,
            description,
            stock,
            image: cloudImg.secure_url
        })

        await newProduct.save()

        return res.status(201).json({
            mensaje: "producto creado",
            newProduct
        })

    } catch (error) {
     console.log(error)   
    }
}


module.exports = {
    getAllProducts,
    createProduct
}