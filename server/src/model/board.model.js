const db = require("../config/db");

class BoardModel {
  // 게시글 작성 푸시
  static pushBoard(userInfo) {
    return new Promise((resolve, reject) => {
      const query =
        "INSERT INTO boards(u_id, title, textfield, photo) VALUES(?,?,?,?,?)";
      db.query(
        query,
        [userInfo.uid, userInfo.title, userInfo.textfield, userInfo.photoURL],
        (err) => {
          if (err) reject(err);
          resolve({
            status: "CREATED",
            code: 201,
            message: "게시글을 성공적으로 작성하였습니다.",
          });
        }
      );
    });
  }

  // 들어오는 board의 id를 통해 게시물 상세 조회
  static getBoardInfo(bid) {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM boards WHERE b_id=?";
      db.query(query, [bid], (err, results) => {
        console.log(bid);
        if (resolve) resolve(results[0]);
        else reject(err);
      });
    });
  }

  static Delete(id) {
    return new Promise((resolve, reject) => {
      const query = "DELETE FROM boards WHERE b_id=?";
      db.query(query, [id], (err, results) => {
        if (resolve)
          resolve({
            status: "No Content",
            code: 204,
            message: "게시물 삭제를 완료했습니다.",
          });
        else reject(err);
      });
    });
  }
}

module.exports = BoardModel;
