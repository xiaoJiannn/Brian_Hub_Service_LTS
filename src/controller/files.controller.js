const { createAvatar, createMoment } = require("../service/files.service");

class filesController {
  async createAvatar(ctx, next) {
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
  async createMoments(ctx, next) {
    try {
      let imgs = [];
      const { id: user_id } = ctx.userInfo;
      const { id: moment_id } = ctx.params;
      for (const item of ctx.request.files) {
        imgs.push({ filename: item.filename, mimetype: item.mimetype });
      }
      const result = await createMoment(user_id, moment_id, imgs);
      ctx.body = { message: "请求成功" };
      await next();
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new filesController();
