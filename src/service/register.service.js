const connection = require("../app/database");
class registerService {
  async createUser(user) {
    try {
      const statment = "INSERT INTO users (name,password) VALUES(?,?) ;";
      const { names, pwd } = user;
      console.log(names, pwd);
      const [value] = await connection.execute(statment, [names, pwd]);
      return value;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new registerService();
