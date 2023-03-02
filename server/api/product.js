const express = require("express");
const {
  getAllProducts,
  createProduct,
  getProductById,
  getProductByName,
  getProductsByCollectionId,
} = require("../db/product");
const { tokenAuth, adminCheck } = require("./utils");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const products = await getAllProducts();

    res.send(products);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await getProductById(id);

    res.send(product);
  } catch (error) {
    next(error);
  }
});

router.get("/collection/:collectionId", async (req, res, next) => {
  try {
    const { collectionId } = req.params;
    const products = await getProductsByCollectionId(collectionId);

    res.send(products);
  } catch (error) {
    next(error);
  }
});

router.get("/name/:name", async (req, res, next) => {
  try {
    const { name } = req.params;
    const product = await getProductByName(name);

    res.send(product);
  } catch (error) {
    next(error);
  }
});

router.post("/create", tokenAuth, adminCheck, async (req, res, next) => {
  try {
    const product = await createProduct(req.body);

    if (!product) {
      next({
        status: 400,
        message:
          "Product could not be created, double check everything and try again.",
      });
    }

    res.send(product);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
