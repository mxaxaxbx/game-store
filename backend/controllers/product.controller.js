const productModel = require('../models/products.model');
const stockModel   = require('../models/stock.model');

const register = async (req, res) => {
    try{
        if( !req.body.name || !req.body.price || !req.body.code ) return res.status(400).send({
            code : 101,
            message: 'Incomplete Data',
        });

        const productExist = await productModel.findOne( { code : req.body.code });
        
        if ( productExist ) return res.status(400).send({
            code : 102,
            message: 'Product already exists',
        });

        const product = new productModel({
            name        : req.body.name,
            code        : req.body.code,
            price       : parseInt( req.body.price ),
            description : req.body.description,
            status      : true,
        });
        const resProd = product.save();

        if( !resProd ) return res.status(400).send({
            code : 103,
            message : 'An error ocurred please try again later',
        });

        const stock = new stockModel({
            product_id : product._id,
            quantity   : req.body.quantity ? parseInt( req.body.quantity ) : 0,
        });
        const resStock = stock.save();

        if( !resStock ) return res.status(400).send({
            code : 103,
            message : 'An error ocurred please try again later',
        });

        return res.status(201).send({ data: stock });

    } catch(e) {
        console.log(`Product Controller Register Error: ${e}`);
        return res.status(400).send({
            code : 105,
            message: 'An error ocurred trying save product. Please try again later',
        });
    }
};

const list = async (req, res) => {
    try{
        const products = await productModel.find( {
            name : new RegExp( req.params['name'], 'i'),
        } )
            .exec();
    
        return res.status(200).send( { data: products } );

    } catch(e) {
        console.log(`Product Controller List Error: ${e}`);
        return res.status(400).send({
            code: 105,
            message: 'An error ocurred listing products. Please try again later'
        })
    }
}

module.exports = { register, list };
