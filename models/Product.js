const { Schema, models, model } = require("mongoose");

const ProductScheema = new Schema({
     name: String,
     description: String,
     price: Number,
     category: String,
     pictures: String,
});

const Product = models?.Product || model("Product", ProductScheema);

export default Product;
