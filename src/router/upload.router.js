const Koa = require("koa");
const koaRouter = require("@koa/router");
const {
  handleAvatar,
  handleMoments,
} = require("../middleware/upload.middleware");
const {
  createAvatar,
  createMoments,
} = require("../controller/files.controller");
const { verifyToken } = require("../middleware/login.middware");
const { updateUserInfo } = require("../controller/user.controller");
const { updateMomentImgs } = require("../controller/moment.controller");
const uploadRouter = new koaRouter({ prefix: "/upload" });
uploadRouter.post(
  "/avatar/:id",
  verifyToken,
  handleAvatar,
  createAvatar,
  updateUserInfo
);
uploadRouter.post(
  "/moment/:id",
  verifyToken,
  handleMoments,
  createMoments,
  updateMomentImgs
);
module.exports = uploadRouter;
