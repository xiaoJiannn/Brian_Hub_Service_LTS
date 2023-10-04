const connection = require("../app/database");
class loginService {
  async queryUerByNames(name) {
    try {
      const statment = "SELECT * FROM users WHERE name=?;";
      const [value] = await connection.execute(statment, [name]);
      return value;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new loginService();
