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
    return res.json(response);
  },
  logout: async (req, res) => {
    const user = new User(req.params.id);
    const response = await user.idCheck();
    console.log(`로그아웃 요청 ${req.params.id}`);
    if (response.status === "OK") {
      console.log(`ok`);
      return res.json({ status: "OK", code: 200 });
    } else {
      console.log(`no ok`);
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
    logger.info(
      `SUCCESS REGISTER (ID : ${req.body.id}, EMAIL : ${req.body.email})`
    );
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
