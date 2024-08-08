const Product = require('../models/product.models');

// Add new product
 async function newProduct (req, res) {
  const { name, description, price, stock, variations } = req.body;
  
  try {
    const newProduct = new Product({ name, description, price, stock, variations });
    const product = await newProduct.save();
    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Edit product
  async function editProduct (req, res) {
  const { name, description, price, stock, variations, hidden } = req.body;
  try {
    let product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }
    product = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: { name, description, price, stock, variations, hidden } },
      { new: true }
    );
    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Hide product
  async function hideProduct (req, res) {
  try {
    let product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }
    product.hidden = true;
    await product.save();
    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get product stock level (Admin only)
 async function getProductStockLevel (req, res) {
  try {
    let product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }
    res.json({ stock: product.stock });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get stock level notifications (Admin only)
 async function getStockLevelNotifications (req, res) {
  try {
    const products = await Product.find({ stock: { $lt: 10 } }); // Example threshold
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};


// Specify the available varriation of the product later..

module.exports = {
  newProduct,
  editProduct,
  hideProduct,
  getProductStockLevel,
  getStockLevelNotifications
}