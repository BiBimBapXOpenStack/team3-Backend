const User = require("../model/user");
const logger = require("../module/winston");

const get = {
  validate: async (req, res) => {
    const user = new User(req.params.id);
    const response = await user.idCheck();
    console.log(`회원가입 ID 중복 확인`);
    return res.json(response);
  },
  userInfo: async (req, res) => {
    const user = new User(req.params.id);
    const response = await user.getUserInfo();
    logger.info(JSON.stringify(req.params.id));
    return res.json(response);
  },
  logout: async (req, res) => {
    const user = new User(req.params.id);
    const response = await user.idCheck();
    logger.info(JSON.stringify(req.params.id));
    console.log(`로그아웃 요청`);
    if (response.status === "OK") {
      return res.json({ status: "OK", code: 200 });
    } else {
      return res.json({ status: "Bad Request", code: 400 });
    }
  },
  withdraw: async (req, res) => {
    const user = new User(req.params.id);
    const response = await user.deleteUser();
    console.log(`회원탈퇴 요청`);
    return res.json(response);
  },
};

const post = {
  register: async (req, res) => {
    const user = new User(req.body);
    const response = await user.register();
    //logger.info(JSON.stringify(req.body));
    return res.json(response);
  },
  login: async (req, res) => {
    const user = new User(req.body);
    const response = await user.login();
    res.cookie("bbb3", response.token);
    return res.json(response);
  },
  edit: async (req, res) => {
    const user = new User(req.body);
    const response = await user.editUser();
    return res.json(response);
  },
};

module.exports = {
  get,
  post,
};
