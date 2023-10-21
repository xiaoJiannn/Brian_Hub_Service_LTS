const Koa = require("koa");
const koaRouter = require("@koa/router");
const {
  createMoment,
  recommendMoment,
  momentDetail,
  userMoment,
  getMomentImgs,
} = require("../controller/moment.controller");
const { verifyMoment } = require("../middleware/moment.middleware");
const { verifyToken } = require("../middleware/login.middware");
const momentRouter = new koaRouter({ prefix: "/moment" });
momentRouter.get("/recommend", recommendMoment);
momentRouter.get("/userMoment", verifyToken, userMoment);
momentRouter.post("/publish", verifyToken, verifyMoment, createMoment);
momentRouter.get("/detail/:id", momentDetail);
momentRouter.get("/imgs/:id", getMomentImgs);
module.exports = momentRouter;
