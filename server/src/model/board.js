const BoardModel = require("./board.model");

class Board {
  constructor(body) {
    this.body = body;
  }

  async getInfo() {
    try {
      //console.log(this.body);
      const boardInfo = await BoardModel.getBoardInfo(this.body);
      return boardInfo;
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
