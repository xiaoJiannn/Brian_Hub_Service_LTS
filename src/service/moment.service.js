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

  async showMoment(offset, size) {
    try {
      const statment = `SELECT
      u.name,
      u.avatarUrl,
      m.content,
      m.title,
      m.user_id,
      m.createAt,
      m.id
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
  async queryMomentById(id) {
    try {
      const statment = `SELECT
      cu.name,
      cu.avatarUrl,
      m.content,
      m.id,
      m.title,
      m.user_id,
      m.createAt, (
          SELECT
    JSON_ARRAYAGG(
        -- comment,
        JSON_OBJECT(
    'id',
    c.id,
    'content',
    c.content,
    'commentId',
    c.comment_id,
    'createAt',
    c.createAt,
    'user',
    JSON_OBJECT(
        'id',
        u.id,
    'avatar',
    u.avatarUrl,
    'name',
    u.name
            )
        )
    )
   FROM comment c
       LEFT JOIN users u ON c.user_id = u.id
   WHERE
       moment_id = m.id
      ) comment
  FROM moments m
      LEFT JOIN users cu ON m.user_id = cu.id
  WHERE m.id = ?; `;
      const [value] = await connection.execute(statment, [id]);
      return value;
    } catch (error) {
      console.log(error);
    }
  }
  async showUserMoment(id) {
    try {
      const statment = `
      SELECT
      m.id,
      m.content,
      u.avatarUrl,
      m.title,
      u.id,
      u.name
    FROM moments m
      LEFT JOIN users u ON m.user_id = u.id
     WHERE u.id = ?; `;
      const [value] = await connection.execute(statment, [id]);
      return value;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new momentService();
