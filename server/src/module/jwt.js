const randToken = require("rand-token");
const jwt = require("jsonwebtoken");
const secretKey = require("../config/secretkey").normal.secretKey;
const option = require("../config/secretkey").normal.option;
const testSecretKey = require("../config/secretkey").test.secretKey;
const testOption = require("../config/secretkey").test.option;
const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;

const normal = {
  sign: async (id) => {
    const payLoad = {
      user_id: id,
    };
    const result = {
      token: jwt.sign(payLoad, secretKey, option),
      refreshToken: randToken.uid(256),
    };
    return result;
  },
  verify: async (token) => {
    let decoded;
    try {
      decoded = jwt.verify(token, secretKey);
    } catch (err) {
      if (err.message === "jwt expired") {
        console.log("expired token");
        return TOKEN_EXPIRED;
      } else if (err.message === "invaild token") {
        console.log("invaild token");
        return TOKEN_INVALID;
      } else {
        console.log("invaild token");
        return TOKEN_INVALID;
      }
    }
    return decoded;
  },
};

const test = {
  sign: async (id) => {
    const payLoad = {
      user_id: id,
    };
    const result = {
      token: jwt.sign(payLoad, testSecretKey, testOption),
      refreshToken: randToken.uid(256),
    };
    return result;
  },
  verify: async (token) => {
    let decoded;
    try {
      decoded = jwt.verify(token, testSecretKey);
    } catch (err) {
      if (err.message === "jwt expired") {
        console.log("expired token");
        return TOKEN_EXPIRED;
      } else if (err.message === "invaild token") {
        console.log("invaild token");
        return TOKEN_INVALID;
      } else {
        console.log("invaild token");
        return TOKEN_INVALID;
      }
    }
    return decoded;
  },
};

module.exports = {
  normal,
  test,
};
