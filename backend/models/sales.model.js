const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
    product_id  : { type : mongoose.Schema.Types.ObjectId, ref : "product" },
    user_id     : { type : mongoose.Schema.Types.ObjectId, ref : "user" },
    date        : { type : Date, default : Date.now() },
    price       : { type : Number, required : true },
});

const sale = mongoose.model("sale",  saleSchema);

module.exports = sale;
