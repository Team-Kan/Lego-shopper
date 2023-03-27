const express = require("express");
const router = express.Router();
const { tokenAuth, adminCheck }= require("./utils")
const { authenticate, getUserByToken, createUser } = require("../db");
const { getAllUsers, editIsAdmin } = require("../db/User");

router.post("/", async (req, res, next) => {
  try {
    const token = await authenticate(req.body);
    res.send({ token });
  } catch (ex) {
    next(ex);
  }
});

router.get("/", tokenAuth, async (req, res, next) => {
  try {
    let token = req.header("Authorization")
    token = token.slice(7);
    res.send(await getUserByToken(token));
  } catch (ex) {
    next(ex);
  }
});

router.post("/register", async (req, res, next) => {
  try {
    const {username, password} = req.body

    const newUser = await createUser({username, password});
    const token = await authenticate({username: newUser.username, password});
    
    res.send({ token });
  } catch (error) {
    next(error);
  }
});

router.get("/admin",tokenAuth, adminCheck, async(req, res, next) => {
  try {
    const users = await getAllUsers();
    res.send(users);
  } catch (error) {
    next(error);
  }
})

router.patch("/:id", tokenAuth, adminCheck, async (req, res, next) => {
  try {
    const {id} = req.params;
    const  {isAdmin} = req.body;

    const user = await editIsAdmin({id, isAdmin})

     res.send(user)
  } catch (error) {
    next (error)
  }
})

module.exports = router