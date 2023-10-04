const Koa = require("koa");
const koaRouter = require("@koa/router");

const { verifyRegister } = require("../middleware/register.middleware");
const { verifyLogin, verifyToken } = require("../middleware/login.middware");
const { login } = require("../controller/login.controller");

const loginRouter = new koaRouter({ prefix: "/login" });
loginRouter.post("/", verifyRegister, verifyLogin, login);
module.exports = loginRouter;
