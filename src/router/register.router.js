const Koa = require("koa");
const koaRouter = require("@koa/router");
const { create } = require("../controller/register.controller");
const {
  encryptedPwd,
  verifyRegister,
} = require("../middleware/register.middleware");
const registerUserRouter = new koaRouter({ prefix: "/register" });
registerUserRouter.post("/", verifyRegister, encryptedPwd, create);
registerUserRouter.post("/test", (ctx, next) => {
  ctx.body = {
    message: "测试通过",
  };
});
module.exports = registerUserRouter;
