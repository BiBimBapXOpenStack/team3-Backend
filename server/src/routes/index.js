const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../public/img");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, path.basename(file.originalname, ext) + "-" + Date.now() + ext);
  },
});
let upload = multer({ storage: storage });

const userCtrl = require("../controller/user.controller");
const boardCtrl = require("../controller/board.controller");

router.get("/users/register/:id", userCtrl.get.validate);
router.get("/users/logout", userCtrl.get.logout);
router.get("/users/:id", userCtrl.get.userInfo);
router.get("/boards/board/:bid", boardCtrl.get.boardinfo);
router.get("/boards/:page", boardCtrl.get.boardsinfo);
router.get("/boards/user/:u_id", boardCtrl.get.boardsMyInfo);

router.post("/users/register", userCtrl.post.register);
router.post("/users/login", userCtrl.post.login);
router.post("/boards/image", upload.single("image"), (req, res) => {
  let imgsrc = "http://localhost:8000/public/img/" + req.file.filename;
  res.json(imgsrc);
});
router.post("/boards", boardCtrl.post.pushBoard);

router.put("/users", userCtrl.post.edit);
router.put("/boards", boardCtrl.post.edit);

router.delete("/users/:id", userCtrl.get.withdraw);
router.delete("/boards/:bid", boardCtrl.get.withdraw);

module.exports = router;
