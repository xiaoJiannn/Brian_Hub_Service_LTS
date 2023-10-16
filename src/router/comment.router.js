const Koa = require("koa");
const koaRouter = require("@koa/router");
const { create } = require("../controller/comment.controller");
const { verifyToken } = require("../middleware/login.middware");
const { verifyPermission } = require("../middleware/permission.middware");
const commentRouter = new koaRouter({ prefix: "/comment" });
commentRouter.post("/publish/:id", verifyToken, create);
module.exports = commentRouter;
