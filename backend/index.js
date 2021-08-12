const express        = require('express');
const cors           = require('cors');

const { dbconnection } = require('./db/db');
const userRoutes       = require('./routes/users.router');
const productRouter    = require('./routes/product.router');
const saleRouter       = require('./routes/sales.router');
// const storeRoutes      = require('./routes/store.router');
// const productRoutes    = require('./routes/product.router');

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/users', userRoutes);
app.use('/api/products', productRouter);
app.use('/api/sales', saleRouter);

app.listen( process.env.PORT, () =>
    console.log("Backend server running on port: " + process.env.PORT )
);

dbconnection();
