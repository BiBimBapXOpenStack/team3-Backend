const User = require("../model/user");

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
    console.log(`회원가입 요청`);
    return res.json(response);
  },
  login: async (req, res) => {
    const user = new User(req);
    const response = await user.login();
    res.cookie("bbb3", response.token);
    console.log(`로그인 요청`);
    return res.json(response);
  },
  edit: async (req, res) => {
    const user = new User(req.body);
    const response = await user.editUser();
    console.log(`회원정보 수정 요청`);
    return res.json(response);
  },
};

module.exports = {
  get,
  post,
};
