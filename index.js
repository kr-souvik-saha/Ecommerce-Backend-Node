const express = require('express');
const connectDb = require('./config/dbConnection');
const {
    createProduct
} = require('./controller/Product');
const dotenv = require("dotenv").config();
const productsRouters = require('./routes/Products');
const brandRouters = require('./routes/Brands');
const categoriesRouter = require('./routes/Categories')
const authRouter = require('./routes/Auth');
const usersRouter = require('./routes/Users');
const cartRouter = require('./routes/Cart');
const orderRouter = require('./routes/Order');
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
server.use('/auth', authRouter.router);
server.use('/users', usersRouter.router);
server.use('/cart', cartRouter.router);
server.use('/orders', orderRouter.router);

server.listen(port, () => {
    console.log('Server is listening to port no ' + port)
})