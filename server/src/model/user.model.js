const db = require("../config/db");
const bcrypt = require("bcrypt");
const saltRounds = 10;

class UserModel {
  // 회원가입 시 아이디 중복체크를 위한 유저 아이디 반환 구문
  static getUserId(idColumn) {
    return new Promise((resolve, reject) => {
      const query = "SELECT id FROM users WHERE id=?";
      db.query(query, [idColumn], (err, result) => {
        if (resolve) {
          //console.log(result[0]);
          if (result[0] == undefined) {
            resolve({
              status: "OK",
              code: 200,
              message: "사용가능한 아이디입니다.",
            });
          } else
            resolve({
              status: "conflict",
              code: 409,
              message: "중복된 아이디입니다.",
            });
        } else reject(err);
      });
    });
  }

  // 회원가입 요청에 대한 응답
  static register(userInfo) {
    return new Promise((resolve, reject) => {
      const newPW = bcrypt.hashSync(userInfo.pw, saltRounds);
      const query = "INSERT INTO users(id, uname, pw, email) VALUES(?,?,?,?)";
      db.query(
        query,
        [userInfo.id, userInfo.uname, newPW, userInfo.email],
        (err) => {
          if (err) reject(err);
          resolve({
            status: "CREATED",
            code: 201,
            message: "회원가입이 성공적으로 완료됐습니다.",
          });
        }
      );
    });
  }

  // 로그인 시 들어오는 회원 id를 통해 회원의 정보를 DB에서 가져오기
  static getUserInfo(id) {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM users WHERE id=?";
      db.query(query, [id], (err, results) => {
        if (resolve) resolve(results[0]);
        else reject(err);
      });
    });
  }

  static editUserModel(userInfo) {
    return new Promise((resolve, reject) => {
      const newPW = bcrypt.hashSync(userInfo.pw, saltRounds);
      console.log(newPW);
      const query = "UPDATE users SET uname=?, pw=?, email=?";
      db.query(
        query,
        [userInfo.uname, newPW, userInfo.email],
        (err, results) => {
          if (resolve)
            resolve({
              status: "OK",
              code: 200,
              message: "수정을 완료했습니다.",
            });
          else reject(err);
        }
      );
    });
  }

  // 회원 탈퇴
  static Delete(id) {
    return new Promise((resolve, reject) => {
      const query = "DELETE FROM users WHERE id=?";
      db.query(query, [id], (err, results) => {
        if (resolve)
          resolve({
            status: "No Content",
            code: 204,
            message: "회원탈퇴를 완료했습니다.",
          });
        else reject(err);
      });
    });
  }
}

module.exports = UserModel;
