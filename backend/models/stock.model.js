const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
    product_id  : { type : mongoose.Schema.Types.ObjectId, ref : "product" },
    quantity    : { type : Number, required : true },
});

const stock = mongoose.model("stock",  stockSchema);

module.exports = stock;
