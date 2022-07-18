normal = {
  secretKey: "YoUrSeCrEtKeY",
  option: {
    algorithm: "HS256",
    expiresIn: "3 days",
    issuer: "issuer",
  },
};

test = {
  secretKey: "YoUrSeCrEtKeY",
  option: {
    algorithm: "HS256",
    expiresIn: "365d",
    issuer: "issuer",
  },
};

module.exports = {
  normal,
  test,
};
