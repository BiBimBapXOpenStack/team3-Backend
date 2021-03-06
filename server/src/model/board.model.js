const db = require("../config/db");

class BoardModel {
  // 게시글 작성 푸시
  static pushBoard(userInfo) {
    return new Promise((resolve, reject) => {
      const query =
        "INSERT INTO boards(u_id, title, textfield, photoURL) VALUES(?,?,?,?)";
      db.query(
        query,
        [userInfo.u_id, userInfo.title, userInfo.textfield, userInfo.photoURL],
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

  // 들어오는 board의 id를 통해 게시물 상세 조회 (이미지 제외)
  static getBoardInfo(bid) {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM boards WHERE bid=?";
      db.query(query, [bid], (err, results) => {
        //console.log(bid);
        if (resolve) resolve(results[0]);
        else reject(err);
      });
    });
  }

  // 게시물에 있는 이미지 경로 불러오기
  static getBoardImg(bid) {
    return new Promise((resolve, reject) => {
      const query = `SELECT photoURL FROM boards WHERE bid=${bid}`;
      db.query(query, (err, results) => {
        //console.log("aa");
        if (resolve) resolve(results[0]);
        else reject(err);
      });
    });
  }

  // 페이지 입력에 맞게 5개씩 출력
  static getBoardInfos(page) {
    return new Promise((resolve, reject) => {
      // const query =
      //   "SELECT * FROM boards ORDER BY enter_date DESC limit 5 OFFSET ?";
      const query = "SELECT * FROM boards ORDER BY enter_date DESC";
      db.query(query, (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  static getBoardsMyInfos(u_id) {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM boards WHERE u_id=?";
      db.query(query, [u_id], (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  static editBoardModel(boardInfo) {
    return new Promise((resolve, reject) => {
      const query =
        "UPDATE boards SET title=?, textfield=?, photoURL=? WHERE bid=?";
      db.query(
        query,
        [
          boardInfo.title,
          boardInfo.textfield,
          boardInfo.photoURL,
          boardInfo.bid,
        ],
        (err, results) => {
          if (resolve) {
            resolve({
              status: "OK",
              code: 200,
              message: "수정을 완료했습니다.",
            });
          } else reject(err);
        }
      );
    });
  }

  static Delete(id) {
    return new Promise((resolve, reject) => {
      const query = "DELETE FROM boards WHERE bid=?";
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
