const fs = require("fs");

const files = fs.readdirSync(__dirname);
function registerRouter(app) {
  for (const item of files) {
    if (!item.endsWith(".router.js")) continue;
    const router = require(`./${item}`);
    app.use(router.routes());
  }
}

module.exports = registerRouter;
