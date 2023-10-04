const Koa = require("koa");
const koaRouter = require("@koa/router");
const {
  createMoment,
  recommentMoment,
} = require("../controller/moment.controller");
const { verifyMoment } = require("../middleware/moment.middleware");
const { verifyToken } = require("../middleware/login.middware");
const momentRouter = new koaRouter({ prefix: "/moment" });
momentRouter.get("/recommend", recommentMoment);
momentRouter.post("/publish", verifyToken, verifyMoment, createMoment);
module.exports = momentRouter;
