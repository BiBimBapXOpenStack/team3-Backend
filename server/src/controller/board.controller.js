const Board = require("../model/board");
const fs = require("fs");
const logger = require("../module/winston");

const get = {
  // 게시글 하나
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
  // 페이지에 해당하는 게시글 목록들
  boardsinfo: async (req, res) => {
    const board = new Board(req.params.page);
    const response = await board.getInfos();
    logger.info(`${req.params.page} PAGE BOARDS`);
    //console.log(`${req.params.page}페이지 게시물들 출력 요청`);
    return res.json(response);
  },
  // 한 유저가 쓴 게시글 목록들
  boardsMyInfo: async (req, res) => {
    const board = new Board(req.params.u_id);
    const response = await board.getMyInfos();
    //console.log(`id : ${req.params.u_id}의 게시물들 출력 요청`);
    return res.json(response);
  },
  // 게시글 삭제
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
    logger.info(`SUCCESS PUSH BOARD (BOARD ID : , USER ID : ${req.body.u_id})`);
    //console.log(`게시물 작성 요청`);
    return res.json(response);
  },
  edit: async (req, res) => {
    const board = new Board(req.body);
    const response = await board.editBoard();
    logger.info(
      `SUCCESS EDIT BOARD (BOARD ID : ${req.body.bid}, USER ID : ${req.body.u_id})`
    );
    //console.log(`게시물 수정 요청`);
    return res.json(response);
  },
};

module.exports = {
  get,
  post,
};
