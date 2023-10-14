const { create } = require("../service/comment.service");
class commentController {
  async create(ctx, next) {
    const result = await create();
    ctx.body = { message: "请求成功" };
  }
}

module.exports = new commentController();
