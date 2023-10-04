const jwt = require("jsonwebtoken");
const { priviteKey } = require("../keys/config/readKeys");
class loginController {
  async login(ctx, next) {
    const { name, password, id } = ctx.user;
    const payload = { name, password, id };
    const token = jwt.sign(payload, priviteKey, {
      expiresIn: 24 * 60 * 60,
      algorithm: "RS256",
    });
    ctx.body = { message: "请求成功", data: { token }, info: ctx.user };
    await next();
  }
}

module.exports = new loginController();
