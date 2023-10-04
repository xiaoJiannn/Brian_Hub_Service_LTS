const app = require("../app");
const {
  PASSWORD_OR_USERNAMES_EMPTY,
  PASSWORD_OR_USERNAMES_ERROR,
  TOKEN_UNDEFINED,
  TOKEN_EXPIRED,
  MOMENT_EMPTY,
} = require("../config/error.config");
app.on("error", (errorMsg, ctx) => {
  let message;
  let code;
  switch (errorMsg) {
    case PASSWORD_OR_USERNAMES_EMPTY:
      code = -1001;
      message = "用户名或密码空";
      break;
    case PASSWORD_OR_USERNAMES_ERROR:
      code = -1002;
      message = "用户名或密码错误";
      break;
    case TOKEN_UNDEFINED:
      code = -1003;
      message = "未授权token";
      break;
    case TOKEN_EXPIRED:
      code = -1004;
      message = "token错误";
      break;
    case MOMENT_EMPTY:
      code = -1005;
      message = "内容不能为空";
      break;
  }
  ctx.body = {
    code,
    message,
  };
});
