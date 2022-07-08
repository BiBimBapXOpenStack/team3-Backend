const toast = require("./toast");
const axios = require("axios");

const putHeader = (token, file) => {
  return {
    headers: {
      "X-Auth-Token": `${token}`,
      "Content-Type": `${file.mimetype}`,
    },
  };
};
const endpoint =
  "https://api-storage.cloud.toast.com/v1/AUTH_35682dae0076479ab712dbb328468535";
const containerName = "/team3";

function ObjectStorage(opts) {
  this.getDestination = opts.destination;
}

ObjectStorage.prototype._handleFile = function _handleFile(req, file, cb) {
  this.getDestination(req, file, function (err, container) {
    if (err) {
      return cb(err);
    }
    console.log(file.originalname);
    let token = toast.getToken();
    let filename = encodeURI(Date.now() + "_" + file.originalname);
    let url = endpoint + containerName + container + filename;
    axios
      .put(url, file.stream, putHeader(token, file))
      .then((response) => {
        console.log("put file success");
        cb(null, {
          filename: filename,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

ObjectStorage.prototype._removeFile = function _removeFile(req, file, cb) {};

module.exports = function (opts) {
  return new ObjectStorage(opts);
};
