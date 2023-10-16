const {
  showMoment,
  createMoment,
  queryMomentById,
  showUserMoment,
} = require("../service/moment.service");
class momentController {
  async createMoment(ctx, next) {
    try {
      const { title, content, id } = ctx.request.body;
      // console.log(title, content, id);
      const result = await createMoment(title, content, id);
      ctx.body = {
        message: "发布成功",
        data: result,
      };
    } catch (error) {
      console.log(error);
    }
  }
  async recommentMoment(ctx, next) {
    const result = await showMoment();
    ctx.body = {
      message: "请求成功",
      data: result,
    };
  }
  async userMoment(ctx, next) {
    const id = ctx.userInfo.id;
    const result = await showUserMoment(id);
    ctx.body = {
      message: "请求成功",
      data: result,
    };
  }
  async momentDetail(ctx, next) {
    const id = ctx.params.id;
    const result = await queryMomentById(id);
    ctx.body = {
      message: "请求成功",
      data: result,
    };
  }
}

module.exports = new momentController();
