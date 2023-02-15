const models = require("../models");

const getOrders = (req, res) => {
  models.orders
    .findAll()
    .then(([rows]) => {
      res.status(200).json(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const postOrder = (req, res) => {
  const order = req.body;
  models.orders
    .insert(order)
    .then(([rows]) => {
      const message = "order successfully created.";
      res.location(`/orders/${rows.insertId}`).status(201).json(message);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.message });
    });
};

const getOrderById = (req, res) => {
  models.orders
    .find(req.params.id)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        res.send(rows[0]);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const getOrderByNumber = (req, res, next) => {
  models.orders
    .findByOrderNumber(req.params.number)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        res.status(200).json(rows);
        next();
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const getOrderByDate = (req, res, next) => {
  models.orders
    .findByOrderDate(req.params.date)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        res.status(200).json(rows);
        next();
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const getOrderByStatus = (req, res, next) => {
  models.orders
    .findByOrderStatus(req.params.status)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        res.status(200).json(rows);
        next();
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const getOrderByUser = (req, res, next) => {
  models.orders
    .findByOrderUser(req.params.user)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        res.status(200).json(rows);
        next();
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const editOrder = (req, res) => {
  const order = req.body;
  order.id = parseInt(req.params.id, 10);
  models.orders
    .update(order)
    .then(([rows]) => {
      if (rows.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        const message = "Order successfully modified.";
        res.status(200).json({ message });
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const deleteOrder = (req, res) => {
  models.orders
    .delete(req.params.id)
    .then(([rows]) => {
      if (rows.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        const message = "Order successfully deleted.";
        res.status(200).json({ message });
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  getOrders,
  postOrder,
  getOrderById,
  getOrderByNumber,
  getOrderByDate,
  getOrderByStatus,
  getOrderByUser,
  editOrder,
  deleteOrder,
};
