const Koa = require("koa");
const koaRouter = require("@koa/router");
const {
  getUserData,
  getUserAvatar,
  updateUserInfo,
  getUserProfile,
  getHomeAvatar,
  updateUserProfile,
} = require("../controller/user.controller");

const { verifyToken } = require("../middleware/login.middware");
const { verifyPermission } = require("../middleware/permission.middware");
const { encryptedPwd } = require("../middleware/register.middleware");

const userRouter = new koaRouter({ prefix: "/user" });
userRouter.get("/", getUserData);
userRouter.get("/avatar/:id", getUserAvatar);

userRouter.post("/update", verifyToken, updateUserInfo);

userRouter.get("/test", verifyToken);

userRouter.get("/profile/:id", verifyToken, getUserProfile);

userRouter.get("/homeAvatar", verifyToken, getHomeAvatar);

userRouter.post(
  "/updateProfile/:id",
  verifyToken,
  verifyPermission,
  updateUserProfile
);
module.exports = userRouter;
