const Board = require("../model/board");
const fs = require("fs");
const logger = require("../module/winston");

const get = {
  boardinfo: async (req, res) => {
    const board = new Board(req.params.bid);
    const response = await board.getInfo();
    return res.json(response);
  },
  boardImg: async (req, res) => {
    const board = new Board(req.params.bid);
    const response = await board.getImg();
    //console.log(response.photoURL);
    fs.readFile(response.photoURL, (err, data) => {
      res.writeHead(200, { "Content-Type": "image/png" });
      res.write(data);
      return res.end();
    });
  },
  boardsinfo: async (req, res) => {
    const board = new Board(req.params.page);
    const response = await board.getInfos();
    console.log(`${req.params.page}페이지 게시물들 출력 요청`);
    return res.json(response);
  },
  boardsMyInfo: async (req, res) => {
    const board = new Board(req.params.u_id);
    const response = await board.getMyInfos();
    console.log(`id : ${req.params.u_id}의 게시물들 출력 요청`);
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
    logger.info(JSON.stringify(req.body));
    const response = await board.insertBoard();
    console.log(`게시물 작성 요청`);
    return res.json(response);
  },
  edit: async (req, res) => {
    const board = new Board(req.body);
    const response = await board.editBoard();
    console.log(`게시물 수정 요청`);
    return res.json(response);
  },
};

module.exports = {
  get,
  post,
};
