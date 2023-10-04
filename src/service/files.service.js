const connection = require("../app/database");
class filesService {
  async createAvatar(user_id, filename, mimetype) {
    const statment =
      "INSERT INTO avatar (user_id,filename,mimetype) VALUES (?,?,?) ;";
    const [value] = await connection.execute(statment, [
      user_id,
      filename,
      mimetype,
    ]);
    return value;
  }
  async queryAvatarById(user_id) {
    const statment = "SELECT filename,mimetype FROM avatar WHERE user_id=? ;";
    const [value] = await connection.execute(statment, [user_id]);
    return value;
  }
}

module.exports = new filesService();
