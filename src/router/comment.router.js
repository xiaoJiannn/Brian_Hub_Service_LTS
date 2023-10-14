const Koa = require("koa");
const koaRouter = require("@koa/router");
const { create } = require("../controller/comment.controller");
const { verifyToken } = require("../middleware/login.middware");
const commentRouter = new koaRouter({ prefix: "/comment" });
commentRouter.post("/publish", verifyToken, create);
module.exports = commentRouter;
