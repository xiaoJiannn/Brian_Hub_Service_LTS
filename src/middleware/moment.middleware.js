const { MOMENT_EMPTY } = require("../config/error.config");
const verifyMoment = async (ctx, next) => {
  const { title, content } = ctx.request.body;
  if (!title || !content) {
    return ctx.app.emit("error", MOMENT_EMPTY, ctx);
  }
  await next();
};
module.exports = { verifyMoment };
