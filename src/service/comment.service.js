const connection = require("../app/database");
class commentService {
  async create(content, user_id, moment_id) {
    const statment =
      "INSERT INTO comment (content,user_id,moment_id) VALUES (?,?,?) ;";
    const [value] = await connection.execute(statment, [
      content,
      user_id,
      moment_id,
    ]);
    return value;
  }
}

module.exports = new commentService();
