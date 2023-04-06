const express = require("express");
const router = express.Router();
const endpointSecret = process.env.STRIPE_SECRET_END;
// This is your test secret API key.
const stripe = require("stripe")(process.env.STRIPE_KEY);

const bodyParser = require('body-parser');
const { calculateOrder } = require("../db");

router.use("/auth", require("./auth"));

router.use("/collections", require("./collection"));

router.use("/products", require("./product"));

router.use("/cart", require("./cart"));

router.use("/cart-products", require("./cart_product"));

router.post("/create-payment-intent", async (req, res) => {
    const { cart } = req.body;
    // Create a PaymentIntent with the order amount and currency
    const {finalTotal} = calculateOrder(cart)
    const paymentIntent = await stripe.paymentIntents.create({
      amount: finalTotal * 100,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });
  
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  });

module.exports = router;