const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name        : { type : String, required : true },
    price       : { type : Number, required : true },
    code        : { type : String, required : true },
    description : { type : String, required : false },
    date        : { type : Date, default : Date.now() },
    status      : { type : Boolean, required: true },
});

const product = mongoose.model("product",  productSchema);

module.exports = product;
