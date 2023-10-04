const encryption = require("crypto");

function encryptPwd(pwd) {
  const md5 = encryption.createHash("md5");
  // 转化为16
  const result = md5.update(pwd).digest("hex");
  return result;
}

module.exports = {encryptPwd};
