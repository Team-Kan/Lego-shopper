const express = require("express");
const {
  getAllProducts,
  createProduct,
  getProductById,
  getProductByName,
  getProductsByCollectionId,
  deleteProduct,
  editProduct,
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
    if(!products.length) {
      next({status: 404, message: "no products found"});
    } else {
      res.send(products);
    }
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

    res.send(product);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", tokenAuth, adminCheck, async (req, res, next) => {
  try {
    const {id} = req.params;
    const product = await deleteProduct(id);
    res.send(product);

  } catch (error) {
    next(error);
  }
})

router.patch("/:id", tokenAuth, adminCheck, async (req, res, next) => {
  try {
    const {id} = req.params;
    const fields = req.body;

    const product = await editProduct({id, ...fields});
    
    res.send(product);
  } catch (error) {
    next(error);
  }
})

module.exports = router;
