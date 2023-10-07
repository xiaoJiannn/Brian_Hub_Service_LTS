const { ACTION_INVALID } = require("../config/error.config");
const verifyPermission = async (ctx, next) => {
  try {
    const { id } = ctx.params;
    const { id: tokenId } = ctx.userInfo;
    if (id != tokenId) {
      return ctx.app.emit("error", ACTION_INVALID, ctx);
    }
    await next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = { verifyPermission };
