const db = require("../config/db");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: "../public/img/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

class BoardModel {
  // 게시글 작성 푸시
  static pushBoard(userInfo) {
    return new Promise(upload.single("image"), (resolve, reject) => {
      let imgsrc = "http://localhost:8000/public/img/" + userInfo.file.filename;
      const query =
        "INSERT INTO boards(u_id, title, textfield, photoURL) VALUES(?,?,?,?)";
      db.query(
        query,
        [userInfo.u_id, userInfo.title, userInfo.textfield, imgsrc],
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
      const query = "SELECT * FROM boards WHERE bid=?";
      db.query(query, [bid], (err, results) => {
        console.log(bid);
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
