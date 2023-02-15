/* eslint-disable camelcase */
const AbstractManager = require("./AbstractManager");

class productsManager extends AbstractManager {
  constructor() {
    super({ table: "products" });
  }

  insert(product) {
    return this.connection.query(
      `INSERT INTO ${this.table} (product_name, reference, description, picture_url, price, category_id) VALUES (?, ?, ?, ?, ?, ?)`,
      [
        product.product_name,
        product.reference,
        product.description,
        product.picture_url,
        product.price,
        product.category_id,
      ]
    );
  }

  findByName(name) {
    return this.connection.query(
      `select * from ${this.table} where product_name = ?`,
      [name]
    );
  }

  update(product) {
    const {
      product_name,
      reference,
      description,
      picture_url,
      price,
      category_id,
    } = product;
    return this.connection.query(
      `update ${this.table} set product_name = ?, reference = ?, description = ?, picture_url = ?, price = ?, category_id = ? where id = ?`,
      [
        product_name,
        reference,
        description,
        picture_url,
        price,
        category_id,
        product.id,
      ]
    );
  }

  delete(id) {
    return this.connection.query(`delete from ${this.table} where id = ?`, [
      id,
    ]);
  }
}

module.exports = productsManager;
