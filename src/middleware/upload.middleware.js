const multer = require("@koa/multer");

// 头像

const uploadAvatar = multer({
  storage: multer.diskStorage({
    destination(req, filenames, cb) {
      cb(null, "./uploads/avatar");
    },
    filename(req, filename, cb) {
      cb(null, filename.originalname);
    },
  }),
});

const handleAvatar = uploadAvatar.single("avatar");

module.exports = {
  handleAvatar,
};
