const express = require('express');
const connectDb = require('./config/dbConnection');
const {
    createProduct
} = require('./controller/Product');
const dotenv = require("dotenv").config();
const productsRouters = require('./routes/Products');
const brandRouters = require('./routes/Brands');
const categoriesRouter = require('./routes/Categories')
const cors = require('cors');

const server = express();
const port = process.env.PORT || 8080;

connectDb();
server.use(cors({
    exposedHeaders: ['X-Total-Count']
}));
server.use(express.json())
server.use('/products', productsRouters.router);
server.use('/brands', brandRouters.router);
server.use('/categories', categoriesRouter.router);

server.listen(port, () => {
    console.log('Server is listening to port no ' + port)
})