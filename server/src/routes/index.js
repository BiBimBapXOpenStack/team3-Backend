const express = require("express");
const router = express.Router();

const userCtrl = require("../controller/user.controller");
const boardCtrl = require("../controller/board.controller");

router.get("/users/register/:id", userCtrl.get.validate);
router.get("/users/logout", userCtrl.get.logout);
router.get("/users/:id", userCtrl.get.userInfo);
router.get("/boards/:b_id", boardCtrl.get.boardinfo);

router.post("/users/register", userCtrl.post.register);
router.post("/users/login", userCtrl.post.login);
router.post("/boards", boardCtrl.post.pushBoard);

router.put("/users", userCtrl.post.edit);
router.put("/boards", boardCtrl.post.edit);

router.delete("/users/:id", userCtrl.get.withdraw);
router.delete("/boards/:b_id", boardCtrl.get.withdraw);

module.exports = router;
