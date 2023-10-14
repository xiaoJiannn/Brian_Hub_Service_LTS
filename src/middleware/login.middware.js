const jwt = require("jsonwebtoken");
const { publicKeys } = require("../keys/config/readKeys");
const { queryUerByNames } = require("../service/login.service");
const { encryptPwd } = require("../utils/encrypt");
const {
  PASSWORD_OR_USERNAMES_ERROR,
  TOKEN_UNDEFINED,
  TOKEN_EXPIRED,
} = require("../config/error.config");
const verifyLogin = async (ctx, next) => {
  try {
    const { names, pwd } = ctx.request.body;
    const result = encryptPwd(pwd);
    const value = await queryUerByNames(names);
    if (value[0].password !== result) {
      return ctx.app.emit("error", PASSWORD_OR_USERNAMES_ERROR, ctx);
    }
    // storge
    ctx.user = value[0];
    await next();
  } catch (error) {
    console.log(error);
  }
};
const verifyToken = async (ctx, next) => {
  const Authorization = ctx.request.header.authorization;
  if (!Authorization) return ctx.app.emit("error", TOKEN_UNDEFINED, ctx);
  const token = Authorization.replace("Bearer ", "");
  try {
    const result = jwt.verify(token, publicKeys, {
      algorithms: ["RS256"],
    });
    ctx.userInfo = result;
    await next();
  } catch (error) {
    return ctx.app.emit("error", TOKEN_EXPIRED, ctx);
  }
};
module.exports = { verifyLogin, verifyToken };
