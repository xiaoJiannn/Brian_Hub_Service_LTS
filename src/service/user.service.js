const connection = require("../app/database");
class userService {
  async showUser() {
    const statment = "SELECT name,avatarUrl,id FROM users ";
    const [value] = await connection.execute(statment);
    return value;
  }
  async updateUserAvatar(avatarUrl, userId) {
    const statment = "UPDATE users SET `avatarUrl`=? WHERE id=? ;";
    const [value] = await connection.execute(statment, [avatarUrl, userId]);
    return value;
  }
  async getUserProfile(id) {
    const statment =
      "SELECT u.name, u.`avatarUrl`, u.id FROM users u WHERE id =?; ";
    const [value] = await connection.execute(statment, [id]);
    return value;
  }
}

module.exports = new userService();
