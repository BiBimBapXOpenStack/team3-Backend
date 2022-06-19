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

  async editUser() {
    try {
      const response = await UserModel.editUserModel(this.body);
      return response;
    } catch (err) {
      console.error(err);
    }
  }

  async login() {
    try {
      const { id, pw } = await UserModel.getUserInfo(this.body.body.id);
      const jwtToken = await jwt.sign(id);
      console.log(id, pw);
      console.log(this.body.body.id, this.body.body.pw);
      if (id) {
        if (id === this.body.body.id) {
          const isEqualPW = bcrypt.compareSync(this.body.body.pw, pw);
          console.log(isEqualPW);
          if (isEqualPW) {
            if (this.body.session.id) {
              return { status: "OK", code: 200, token: jwtToken };
            } else {
              this.body.session.id = id;
              console.log(this.body.session.id);
              return { status: "OK", code: 200, token: jwtToken };
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
      } else {
        return {
          status: "OK",
          code: 200,
          message: "로그인에 실패했습니다.",
        };
      }
    } catch (err) {
      return {
        status: "OK",
        code: 200,
        message: "로그인에 실패했습니다.",
      };
      console.error(err);
    }
  }
}

module.exports = User;
