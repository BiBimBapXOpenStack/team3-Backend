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
  this.getDestination(req, file, async function (err, container) {
    if (err) {
      //return cb(err);
    }
    let token = await toast.getToken();
    //console.log("auth token : ", token);
    let filename = encodeURI(Date.now() + "_" + file.originalname);
    let url = endpoint + containerName + container + filename;
    //console.log("file stream : ", file.stream);
    await axios
      .put(url, file.stream, putHeader(token, file))
      .then((response) => {
        console.log("put file success");
        cb(null, {
          filename: filename,
        });
      })
      .catch((err) => {
        //console.log(err);
      });
  });
};

ObjectStorage.prototype._removeFile = function _removeFile(req, file, cb) {};

module.exports = function (opts) {
  return new ObjectStorage(opts);
};