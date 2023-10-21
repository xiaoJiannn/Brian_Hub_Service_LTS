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
  async createMoment(user_id, moment_id, files) {
    const statment =
      " INSERT INTO photo ( user_id, moment_id, filename, mimetype ) VALUES(?, ?, ?, ?);";
    for (const item of files) {
      const [value] = await connection.execute(statment, [
        user_id,
        moment_id,
        item.filename,
        item.mimetype,
      ]);
    }
    return "success";
  }

  async queryAvatarById(user_id) {
    const statment = "SELECT filename,mimetype FROM avatar WHERE user_id=? ;";
    const [value] = await connection.execute(statment, [user_id]);
    return value;
  }
  async queryMomentImgsById(id) {
    const statment = "SELECT id FROM photo WHERE moment_id=? ;";
    const [value] = await connection.execute(statment, [id]);
    return value;
  }
  async queryImgsById(id) {
    const statment = "SELECT filename,mimetype,id FROM photo WHERE id=? ;";
    const [value] = await connection.execute(statment, [id]);
    return value;
  }
}

module.exports = new filesService();
