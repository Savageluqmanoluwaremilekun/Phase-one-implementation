const express = require("express");
const app = express();
const adminRouter = require("./routes/admin.router");
const authRouter = require("./routes/auth.router");
const productsRouter = require("./routes/products.router");
app.use(express.json());

app.use("/", adminRouter);
app.use("/auth" , authRouter);
app.use("/", productsRouter);
app.use("*/", (req, res) => {
    res.status(404).json({message: "Route not found"})
});



module.exports = app;