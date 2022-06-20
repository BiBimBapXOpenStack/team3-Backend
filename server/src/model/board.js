const BoardModel = require("./board.model");

class Board {
  constructor(body) {
    this.body = body;
  }

  // 게시물 하나에 대한 자세한 정보
  async getInfo() {
    try {
      //console.log(this.body);
      const boardInfo = await BoardModel.getBoardInfo(this.body);
      return boardInfo;
    } catch (err) {
      console.error(err);
    }
  }

  // 게시물 목록들 출력
  async getInfos() {
    try {
      const boardsInfo = await BoardModel.getBoardInfos(this.body);
      return boardsInfo;
    } catch (err) {
      console.error(err);
    }
  }

  async insertBoard() {
    try {
      const response = await BoardModel.pushBoard(this.body);
      return response;
    } catch (err) {
      console.error(err);
    }
  }

  async deleteBoard() {
    try {
      const response = await BoardModel.Delete(this.body);
      return response;
    } catch (err) {
      console.error(err);
    }
  }
}

module.exports = Board;
