const UserModel = require("./user.model");
const jwt = require("../module/jwt");
const bcrypt = require("bcrypt");

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

  async edit() {
    try {
      const response = await UserModer.editUser(this.body);
      return response;
    } catch (err) {
      console.error(err);
    }
  }

  async login() {
    try {
      const { id, pw } = await UserModel.getUserInfo(this.body.id);
      const jwtToken = await jwt.sign(id);
      console.log(id, pw);
      console.log(this.body.id, this.body.pw);
      if (id) {
        if (id === this.body.id) {
          console.log("id equal");
          const isEqualPW = bcrypt.compareSync(this.body.pw, pw);
          console.log(isEqualPW);
          if (isEqualPW) {
            return { status: "OK", code: 200, token: jwtToken };
          } else {
            return {
              status: "OK",
              code: 200,
              message: "로그인에 실패했습니다.",
            };
          }
        } else {
          return {
            status: "OK",
            code: 200,
            message: "로그인에 실패했습니다.",
          };
        }
      } else {
        return {
          status: "OK",
          code: 200,
          message: "로그인에 실패했습니다.",
        };
      }
    } catch (err) {
      console.error(err);
    }
  }
}

module.exports = User;
