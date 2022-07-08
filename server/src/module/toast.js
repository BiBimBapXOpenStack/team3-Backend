const axios = require("axios");
const fs = require("fs");

let token;
const endpoint =
  "https://api-storage.cloud.toast.com/v1/AUTH_35682dae0076479ab712dbb328468535";
const containerName = "/team3";

const authHeader = (token) => {
  return {
    headers: {
      "X-Auth-Token": `${token}`,
    },
  };
};

const getToken = async () => {
  console.log("get token : ", token);
  if (token != null) return token;
  else {
    token = await getTokenFromToast();
    return token;
  }
};

exports.getToken = () => {
  getToken();
};

const getTokenFromToast = async () => {
  let tokenURL = "https://api-identity.infrastructure.cloud.toast.com/v2.0";
  let tokenHeader = {
    headers: { "Content-Type": "application/json" },
  };
  let body = {
    auth: {
      tenantId: "35682dae0076479ab712dbb328468535",
      passwordCredentials: {
        username: "khsofficial1213@gmail.com",
        password: "hs1213",
      },
    },
  };

  let result = await axios.post(tokenURL, body, tokenHeader);
  console.log("Object Storage Token : ", result.data.access.token.id);
  return result.data.access.token.id;
};

exports.getListFromToast = async () => {
  let token = await getToken();
  if (token != null) {
    let getContainerURL = endpoint + containerName;
    // console.log(authHeader(token));
    let result = await axios.get(getContainerURL, authHeader(token));
    return result.data;
  } else {
    return "nothing";
  }
};

exports.putObjectToToast = async (req, res, next) => {
  let token = await getToken();
  let url = endpoint + containerName + "/" + encodeURI(req.file.path);
  try {
    if (fs.existsSync(req.file.path)) {
      let file = fs.createReadStream(req.file.path);
      let result = await axios.put(url, file, putHeader(token, req));
      //console.log(result);
      return url;
    }
  } catch (error) {
    //console.log(error);
  }
};
