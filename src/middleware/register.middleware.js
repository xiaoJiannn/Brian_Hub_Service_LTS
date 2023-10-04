const { encryptPwd } = require("../utils/encrypt");
const { PASSWORD_OR_USERNAMES_EMPTY } = require("../config/error.config");
const verifyRegister = async (ctx, next) => {
  const { names, pwd } = ctx.request.body;
  if (!names || !pwd) {
    return ctx.app.emit("error", PASSWORD_OR_USERNAMES_EMPTY, ctx);
  }
  await next();
};
const encryptedPwd = async (ctx, next) => {
  const { pwd } = ctx.request.body;
  const result = encryptPwd(pwd);
  ctx.request.body.pwd = result;
  await next();
};

module.exports = { encryptedPwd, verifyRegister };
