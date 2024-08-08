const express = require("express");
const adminRouter = express.Router();
const {
    newProduct,
    editProduct,
    hideProduct,
    getProductStockLevel,
    getStockLevelNotifications
  } = require("../controllers/admin.controller");
// middleware implementation
const auth = require('../middlewares/roleVerification');
const verifyJWT = require("../middlewares/verifyJWT")


adminRouter.post('/admin/products', verifyJWT,auth, newProduct);
adminRouter.put('/admin/products/:id',  verifyJWT, auth, editProduct);
adminRouter.patch('/admin/products/:id/hide', verifyJWT, auth, hideProduct);
adminRouter.get('/admin/stock-notifications', verifyJWT,auth, getStockLevelNotifications);
adminRouter.get('/admin/products/:id/stock', verifyJWT, auth, getProductStockLevel);

module.exports = adminRouter;