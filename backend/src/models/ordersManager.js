/* eslint-disable camelcase */
const AbstractManager = require("./AbstractManager");

class ordersManager extends AbstractManager {
  constructor() {
    super({ table: "orders" });
  }

  insert(order) {
    const {
      order_number,
      order_date,
      total_amount,
      payment_method,
      order_status,
      user_id,
    } = order;
    return this.connection.query(
      `insert into ${this.table} (order_number, order_date, total_amount, payment_method, order_status, user_id) values (?, ?, ?, ?, ?, ?)`,
      [
        order_number,
        order_date,
        total_amount,
        payment_method,
        order_status,
        user_id,
      ]
    );
  }

  update(order) {
    const {
      order_number,
      order_date,
      total_amount,
      payment_method,
      order_status,
      user_id,
    } = order;
    return this.connection.query(
      `update ${this.table} set order_number = ?, order_date = ?, total_amount = ?, payment_method = ?, order_status = ? where id = ?`,
      [
        order_number,
        order_date,
        total_amount,
        payment_method,
        order_status,
        user_id,
      ]
    );
  }

  findByOrderNumber(order) {
    const { order_number } = order;
    return this.connection.query(
      `select * from ${this.table} where order_number = ?`,
      [order_number]
    );
  }

  findByOrderStatus(order) {
    const { order_status } = order;
    return this.connection.query(
      `select * from ${this.table} where order_status = ?`,
      [order_status]
    );
  }

  findByOrderDate(order) {
    const { order_date } = order;
    return this.connection.query(
      `select * from ${this.table} where order_date = ?`,
      [order_date]
    );
  }

  findByPaymentMethod(order) {
    const { payment_method } = order;
    return this.connection.query(
      `select * from ${this.table} where payment_method = ?`,
      [payment_method]
    );
  }

  findByTotalAmount(order) {
    const { total_amount } = order;
    return this.connection.query(
      `select * from ${this.table} where total_amount = ?`,
      [total_amount]
    );
  }

  findByUserId(order) {
    const { user_id } = order;
    return this.connection.query(
      `select * from ${this.table} where user_id = ?`,
      [user_id]
    );
  }

  findByOrderId(order) {
    const { id } = order;
    return this.connection.query(`select * from ${this.table} where id = ?`, [
      id,
    ]);
  }

  delete(order) {
    const { id } = order;
    return this.connection.query(`delete from ${this.table} where id = ?`, [
      id,
    ]);
  }

  findAll() {
    return this.connection.query(`select * from ${this.table}`);
  }

  findLastOrder() {
    return this.connection.query(
      `SELECT * FROM ${this.table} ORDER BY id DESC LIMIT 1`
    );
  }

  findLastOrderId() {
    return this.findLastOrder().id;
  }

  findLastOrderNumber() {
    return this.findLastOrder().order_number;
  }

  findLastOrderDate() {
    return this.findLastOrder().order_date;
  }

  findLastTotalAmount() {
    return this.findLastOrder().total_amount;
  }

  findLastPaymentMethod() {
    return this.findLastOrder().payment_method;
  }

  findLastOrderStatus() {
    return this.findLastOrder().order_status;
  }

  findLastUserId() {
    return this.findLastOrder().user_id;
  }

  findOrdersWithUsers() {
    return this.connection.query(
      `select * from ${this.table} inner join users on orders.user_id = users.id`
    );
  }

  findOrdersWithUsersByUserId(order) {
    const { user_id } = order;
    return this.connection.query(
      `select * from ${this.table} inner join users on orders.user_id = users.id where orders.user_id = ?`,
      [user_id]
    );
  }
}

module.exports = ordersManager;
