const fs = require("fs");
const path = require("path");
const priviteKey = fs.readFileSync(path.resolve(__dirname, "../private.key"));
const publicKeys = fs.readFileSync(path.resolve(__dirname, "../public.key"));
module.exports = {
  priviteKey,
  publicKeys,
};
