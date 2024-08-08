const express = require('express');
const productsRouter = express.Router();
const auth = require('../middlewares/verifyJWT');
const {
    getProducts,
    getProductByID,
    purchaseProduct
  } = require("../controllers/products.controller");


productsRouter.get('/products',getProducts);
productsRouter.get('/products/:id',getProductByID);
productsRouter.post('/products/:id/purchase',auth,purchaseProduct);

module.exports = productsRouter;