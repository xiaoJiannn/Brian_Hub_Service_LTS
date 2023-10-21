const {
  showMoment,
  createMoment,
  queryMomentById,
  showUserMoment,
  updateMomentImgs,
} = require("../service/moment.service");
const {
  queryMomentImgsById,
  queryImgsById,
} = require("../service/files.service");
const { uploadPathForMoment } = require("../config/path.config");
const { HOST, PORT } = require("../config/server.config");
const fs = require("fs");
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
  async updateMomentImgs(ctx, next) {
    const id = ctx.params.id;
    const result = await queryMomentImgsById(id);
    let urlArray = [];
    for (const item of result) {
      urlArray.push(`${HOST}:${PORT}/moment/imgs/${item.id}`);
    }
    const updateRes = await updateMomentImgs(id, urlArray);
    await next();
  }
  async getMomentImgs(ctx, next) {
    try {
      const id = ctx.params.id;
      const result = await queryImgsById(id);
      const { filename, mimetype } = result[0];
      console.log(filename, mimetype);
      ctx.type = mimetype;
      ctx.body = fs.createReadStream(`${uploadPathForMoment}/${filename}`);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new momentController();
