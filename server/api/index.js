const express = require("express");
const router = express.Router();

router.use("/auth", require("./auth"));

router.use("/collections", require("./collection"));

router.use("/products", require("./product"));

router.use("/cart", require("./cart"));

router.use("/cart-products", require("./cart_product"));

router.use("/mail", require("./mail"));

module.exports = router;
