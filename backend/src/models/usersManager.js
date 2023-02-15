const AbstractManager = require("./AbstractManager");

class usersManager extends AbstractManager {
  constructor() {
    super({ table: "users" });
  }

  insert(user) {
    return this.connection.query(
      `INSERT INTO ${this.table} (firstname, lastname, phone, email, hashedPassword, role) VALUES (?, ?, ?, ?, ?, ?)`,
      [
        user.firstname,
        user.lastname,
        user.phone,
        user.email,
        user.hashedPassword,
        user.role,
      ]
    );
  }

  findByName(name) {
    return this.connection.query(
      `select * from ${this.table} where firstname = ? or lastname = ?`,
      [name, name]
    );
  }

  update(user) {
    const { firstname, lastname, phone, email, role } = user;
    return this.connection.query(
      `update ${this.table} set firstname = ?, lastname = ?, phone = ?, email = ?, role = ? where id = ?`,
      [firstname, lastname, phone, email, role, user.id]
    );
  }

  findByEmail(user) {
    const { email } = user;
    return this.connection.query(
      `SELECT * FROM ${this.table} WHERE email = ?`,
      [email]
    );
  }
}

module.exports = usersManager;
