const User = require("../model/user");

const get = {
  validate: async (req, res) => {
    const user = new User(req.params.id);
    const response = await user.idCheck();
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
    //console.log(req.params.id);
    if (response.status === "OK") {
      return res.json({ status: "OK", code: 200 });
    } else {
      return res.json({ status: "Bad Request", code: 400 });
    }
  },
  withdraw: async (req, res) => {
    const user = new User(req.params.id);
    const response = await user.deleteUser();
    return res.json(response);
  },
};

const post = {
  register: async (req, res) => {
    const user = new User(req.body);
    const response = await user.register();
    return res.json(response);
  },

  login: async (req, res) => {
    const user = new User(req.body);
    const response = await user.login();
    return res.json(response);
  },
  edit: async (req, res) => {
    const user = new User(req.params.id);
    const response = await user.editUser();
    return res.json(response);
  },
};

module.exports = {
  get,
  post,
};
