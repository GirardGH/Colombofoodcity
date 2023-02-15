/* eslint-disable camelcase */
const AbstractManager = require("./AbstractManager");

class categoriesManager extends AbstractManager {
  constructor() {
    super({ table: "categories" });
  }

  insert(category) {
    return this.connection.query(
      `INSERT INTO ${this.table} (category_name, category_description, parent_id) VALUES (?, ?, ?)`,
      [
        category.category_name,
        category.category_description,
        category.parent_id,
      ]
    );
  }

  findByName(name) {
    return this.connection.query(
      `select * from ${this.table} where category_name = ?`,
      [name]
    );
  }

  update(category) {
    const { category_name, category_description, parent_id } = category;
    return this.connection.query(
      `update ${this.table} set category_name = ?, category_description = ?, parent_id = ? where id = ?`,
      [category_name, category_description, parent_id, category.id]
    );
  }
}

module.exports = categoriesManager;
