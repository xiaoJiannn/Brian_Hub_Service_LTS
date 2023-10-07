const fs = require("fs");
const { queryAvatarById } = require("../service/files.service");
const {
  showUser,
  updateUserAvatar,
  getUserProfile,
  updateUserProfile,
} = require("../service/user.service");

const { uploadPathForAvatar } = require("../config/path.config");
const { HOST, PORT } = require("../config/server.config");
const { encryptPwd } = require("../utils/encrypt");
const { log } = require("console");
class userController {
  async getUserData(ctx, next) {
    const result = await showUser();
    ctx.body = { message: "请求成功", data: result };
    await next();
  }
  async getUserAvatar(ctx, next) {
    try {
      const { id } = ctx.params;
      const result = await queryAvatarById(id);
      const { filename, mimetype } = result.pop();
      ctx.type = mimetype;
      ctx.body = fs.createReadStream(`${uploadPathForAvatar}/${filename}`);
    } catch (error) {
      console.log(error);
    }

    await next();
  }

  async getHomeAvatar(ctx, next) {
    try {
      const { id } = ctx.userInfo;
      const result = await getUserProfile(id);
      ctx.body = {
        message: "请求成功",
        data: result[0],
      };
    } catch (error) {
      console.log(error);
    }
    await next();
  }
  async updateUserInfo(ctx, next) {
    try {
      const { id } = ctx.params;
      const avatarUrl = `${HOST}:${PORT}/user/avatar/${id}`;
      const updateResult = await updateUserAvatar(avatarUrl, id);
      ctx.body = { message: "请求成功" };
      await next();
    } catch (error) {
      console.log(error);
    }
  }
  async getUserProfile(ctx, next) {
    try {
      // const { id } = ctx.userInfo;
      const { id } = ctx.params;
      const result = await getUserProfile(id);
      ctx.body = { message: "请求成功", data: result };
      await next();
    } catch (error) {
      console.log(error);
    }
  }

  async updateUserProfile(ctx, next) {
    try {
      const { pwd, name } = ctx.request.body;
      const { id } = ctx.params;
      const md5 = encryptPwd(pwd);
      console.log(pwd);
      const result = await updateUserProfile(name, md5, id);
      ctx.body = { message: "请求成功" };
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new userController();
