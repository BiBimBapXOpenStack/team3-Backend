const UserModel = require("./user.model");
const jwt = require("../module/jwt").normal;
const bcrypt = require("bcrypt");
const logger = require("../module/winston");

class User {
  constructor(body) {
    this.body = body;
  }

  async idCheck() {
    try {
      const response = await UserModel.getUserId(this.body);
      return response;
    } catch (err) {
      console.error(err);
    }
  }
  async getUserInfo() {
    try {
      const response = await UserModel.getUserInfo(this.body);
      return response;
    } catch (err) {
      console.error(err);
    }
  }
  async register() {
    try {
      //console.log(this.body);
      const response = await UserModel.register(this.body);
      return response;
    } catch (err) {
      console.error(err);
    }
  }

  async deleteUser() {
    try {
      const response = await UserModel.Delete(this.body);
      return response;
    } catch (err) {
      console.error(err);
    }
  }

  async editUser() {
    try {
      const response = await UserModel.editUserModel(this.body);
      return response;
    } catch (err) {
      console.error(err);
    }
  }

  // jwt로 토큰 값을 넘겨준다음 프론트에서 decode 시켜주는 방식으로 구현하려 했으나 decode를 어떻게 해야할 지 몰라서 일단 그냥 id값을 넘겨주기로....
  async login() {
    try {
      const { id, pw } = await UserModel.getUserInfo(this.body.body.id);
      const jwtToken = await jwt.sign(id);
      //console.log(id, pw);
      //console.log(this.body.body.id, this.body.body.pw);
      if (id) {
        if (id === this.body.body.id) {
          const isEqualPW = bcrypt.compareSync(this.body.body.pw, pw);
          if (isEqualPW) {
            logger.info(`LOGIN SUCCESS. (ID : ${this.body.body.id})`);
            return {
              status: "OK",
              code: 200,
              token: jwtToken,
              id: this.body.body.id,
            };
          } else {
            logger.error("PASSWORD NOT EQUAL");
            return {
              status: "OK",
              code: 200,
              message: "로그인에 실패했습니다.",
            };
          }
        } else {
          logger.error("ID NOT EQUAL");
          return {
            status: "OK",
            code: 200,
            message: "로그인에 실패했습니다.",
          };
        }
      } else {
        logger.error("ID NOT FOUND");
        return {
          status: "OK",
          code: 200,
          message: "로그인에 실패했습니다.",
        };
      }
    } catch (err) {
      logger.error(err);
      return {
        status: "OK",
        code: 200,
        message: "로그인에 실패했습니다.",
      };
    }
  }
}

module.exports = User;
