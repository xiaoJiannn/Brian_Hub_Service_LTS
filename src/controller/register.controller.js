const { createUser } = require("../service/register.service");
class registerController {
  async create(ctx, next) {
    const userInfo = ctx.request.body;
    const result = await createUser(userInfo);
    ctx.body = { message: "请求成功", data: result };
  }
}

module.exports = new registerController();
