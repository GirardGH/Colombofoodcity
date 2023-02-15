/* eslint-disable camelcase */
const AbstractManager = require("./AbstractManager");

class reviewsManager extends AbstractManager {
  constructor() {
    super({ table: "reviews" });
  }

  insert(review) {
    const { product_id, user_id, rating, review_text } = review;
    return this.connection.query(
      `INSERT INTO ${this.table} (product_id, user_id, rating, review_text) VALUES (?, ?, ?, ?)`,
      [product_id, user_id, rating, review_text]
    );
  }

  update(review) {
    const { product_id, user_id, rating, review_text } = review;
    return this.connection.query(
      `update ${this.table} set product_id = ?, user_id = ?, rating = ?, review_text = ? where id = ?`,
      [product_id, user_id, rating, review_text, review.id]
    );
  }

  findByProductId(product_id) {
    return this.connection.query(
      `select * from ${this.table} where product_id = ?`,
      [product_id]
    );
  }

  findByUserId(user_id) {
    return this.connection.query(
      `select * from ${this.table} inner join users on reviews.user_id = users.id where user_id = ?`,
      [user_id]
    );
  }
}

module.exports = reviewsManager;
