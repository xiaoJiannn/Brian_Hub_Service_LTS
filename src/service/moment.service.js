const connection = require("../app/database");
class momentService {
  async createMoment(title, content, id) {
    try {
      const statment =
        " INSERT INTO moments (title,content,user_id) VALUES(?,?,?) ;";
      const [value] = await connection.execute(statment, [title, content, id]);
      return value;
    } catch (error) {
      console.log(error);
    }
  }

  async showMoment(offset = 0, size = 100) {
    try {
      const statment = `SELECT
      u.name,
      u.avatarUrl,
      m.content,
      m.title,
      m.user_id,
      m.createAt
      FROM moments m
          LEFT JOIN users u ON m.user_id = u.id
      LIMIT ?
      OFFSET ?; `;
      const [value] = await connection.execute(statment, [
        String(size),
        String(offset),
      ]);
      return value;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new momentService();
