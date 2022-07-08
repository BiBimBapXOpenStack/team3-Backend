const multer = require("multer");
const ObjectStorage = require("./MulterObjectStorage");

const uploadOS = multer({
  storage: ObjectStorage({
    destination(req, file, cb) {
      console.log("in uploadOS");
      cb(null, `/`);
    },
  }),
});

module.exports = uploadOS;
