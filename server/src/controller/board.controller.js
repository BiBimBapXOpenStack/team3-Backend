const Board = require("../model/board");
const fs = require("fs");

const get = {
  boardinfo: async (req, res) => {
    const board = new Board(req.params.bid);
    const response = await board.getInfo();
    return res.json(response);
  },
  boardImg: async (req, res) => {
    const board = new Board(req.params.bid);
    const response = await board.getImg();
    console.log(response);
    fs.readFile(response, (err, data) => {
      res.writeHead(200, { "Content-Type": "image/png" });
      res.write(data);
      return res.end();
    });
  },
  boardsinfo: async (req, res) => {
    const board = new Board(req.params.page);
    const response = await board.getInfos();
    return res.json(response);
  },
  boardsMyInfo: async (req, res) => {
    const board = new Board(req.params.u_id);
    const response = await board.getMyInfos();
    return res.json(response);
  },
  withdraw: async (req, res) => {
    const board = new Board(req.params.bid);
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
  edit: async (req, res) => {
    const board = new Board(req.body);
    const response = await board.editBoard();
    return res.json(response);
  },
};

module.exports = {
  get,
  post,
};
