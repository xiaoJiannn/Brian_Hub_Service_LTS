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
      const result = await createMoment(title, content, id);
      ctx.body = {
        message: "发布成功",
        data: result,
      };
    } catch (error) {
      console.log(error);
    }
  }
  async recommendMoment(ctx, next) {
    const { offset, size } = ctx.request.query;
    const result = await showMoment(offset, size);
    console.log(offset, size);
    ctx.body = {
      message: "请求成功",
      isAll: size > result.length,
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
