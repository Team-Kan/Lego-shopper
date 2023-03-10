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
    res.send(await getUserByToken(req.headers.authorization));
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
// TODO
router.patch("/:id", tokenAuth, adminCheck, async (req, res, next) => {
  try {
    const {id} = req.params;
    console.log(id)
    const  {isAdmin} = req.body;

    const user = await editIsAdmin({id, isAdmin})

     res.send(user)
  } catch (error) {
    next (error)
  }
})

module.exports = router