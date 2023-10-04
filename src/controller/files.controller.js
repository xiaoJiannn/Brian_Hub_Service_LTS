const { createAvatar } = require("../service/files.service");

class filesController {
  async createfiles(ctx, next) {
    try {
      const { filename, mimetype } = ctx.request.file;
      const { id } = ctx.userInfo;
      const result = await createAvatar(id, filename, mimetype);
      ctx.body = { message: "请求成功" };
      await next();
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new filesController();
