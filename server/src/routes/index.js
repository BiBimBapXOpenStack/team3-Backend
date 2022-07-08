const express = require("express");
const router = express.Router();
const uploadOS = require("../module/uploadOS");

const userCtrl = require("../controller/user.controller");
const boardCtrl = require("../controller/board.controller");

router.get("/users/register/:id", userCtrl.get.validate);
router.get("/users/logout", userCtrl.get.logout);
router.get("/users/:id", userCtrl.get.userInfo);
router.get("/boards/board/:bid", boardCtrl.get.boardinfo);
router.get("/board/image/:bid", boardCtrl.get.boardImg);
router.get("/boards/:page", boardCtrl.get.boardsinfo);
router.get("/boards/user/:u_id", boardCtrl.get.boardsMyInfo);

router.post("/users/register", userCtrl.post.register);
router.post("/users/login", userCtrl.post.login);
router.post("/boards/image", uploadOS.single("file"), (req, res) => {
  console.log("upload file to Object Storage : ", req.file.filename);
  console.log(res.file);
  res.json(req.file.filename);
});
router.post("/boards", boardCtrl.post.pushBoard);

router.put("/users", userCtrl.post.edit);
router.put("/boards", boardCtrl.post.edit);

router.delete("/users/:id", userCtrl.get.withdraw);
router.delete("/boards/:bid", boardCtrl.get.withdraw);

module.exports = router;
