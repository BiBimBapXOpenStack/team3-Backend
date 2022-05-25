const Board = require("../model/board");

const get = {
  boardinfo: async (req, res) => {
    const board = new Board(req.params.b_id);
    const response = await board.getInfo();
    return res.json(response);
  },
  withdraw: async (req, res) => {
    const board = new Board(req.params.b_id);
    const response = await board.deleteBoard();
    return res.json(response);
  },
};

const post = {
  pushBoard: async (req, res) => {
    const board = new Board(req.body);
    const response = await board.insertBoard();
    return res.json(response);
  },
};

module.exports = {
  get,
  post,
};