const mongoose = require('mongoose');

const stockModel   = require('../models/stock.model');
const productModel = require('../models/products.model');
const userModel    = require('../models/users.model');
const saleModel    = require('../models/sales.model');

const register = async (req, res) => {
    try {
        if( !req.body.product_id || !req.body.user_id || !req.body.quantity ) return res.status(400).send({
            code: 101,
            message: 'Incomplete data',
        });

        // Validar producto
        const product = await productModel.findOne( { _id : new mongoose.Types.ObjectId( req.body.product_id ) } );
        if( !product ) return res.status(400).send({
            code: 102,
            message: 'Enter a valid product',
        });
        if( !product.status ) return res.status(400).send({
            code: 106,
            message: 'The product is disabled',
        });

        const user = await userModel.findOne( { _id : new mongoose.Types.ObjectId( req.body.user_id ) } );
        if( !user ) return res.status(400).send({
            code: 102,
            message: 'Enter a valid product',
        });
        if( !user.status ) return res.status(401).send({
            code: 106,
            message: 'The user is disabled',
        });

        let stock = await stockModel.findOne( { product_id : new mongoose.Types.ObjectId( req.body.product_id ) } );
        // Validar cantidad de products
        const newStockQuantity = stock.quantity - parseInt( req.body.quantity );
        if( newStockQuantity < 0 ) return res.status(400).send({
            code: 107,
            message: `The quantity mount is much than stock. Current quantity: ${stock.quantity}`,
        });
        stock.quantity = newStockQuantity;

        const price = product.price * req.body.quantity;

        const sale = new saleModel({
            product_id : req.body.product_id,
            user_id    : req.body.user_id,
            price,
        })
        const result = sale.save();
        if( !result ) return res.status(400).send({
            code: 103,
            message: 'An error ocurred trying registrer sale.',
        });

        stock.save();

        return res.status(200).send({ data: sale });


    } catch(e) {
        console.log(`Sales Controller Register Error: ${e}`);
        return res.status(400).send({
            code: 105,
            message: 'An error ocurred try again later',
        });
    }
}

module.exports = { register }
