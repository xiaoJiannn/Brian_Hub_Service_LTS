const Koa = require("koa");
const koaRouter = require("@koa/router");
const { handleAvatar } = require("../middleware/upload.middleware");
const { createfiles } = require("../controller/files.controller");
const { verifyToken } = require("../middleware/login.middware");
const { updateUserInfo } = require("../controller/user.controller");
const uploadRouter = new koaRouter({ prefix: "/upload" });
uploadRouter.post(
  "/avatar/:id",
  verifyToken,
  handleAvatar,
  createfiles,
  updateUserInfo
);
module.exports = uploadRouter;
