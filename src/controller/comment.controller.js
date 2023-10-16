const { create } = require("../service/comment.service");
class commentController {
  async create(ctx, next) {
    try {
      const { content, momentId } = ctx.request.body;
      const { id } = ctx.params;
      console.log(content, momentId, id);
      const result = await create(content, id, momentId);
      ctx.body = { message: "请求成功", data: result };
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new commentController();
