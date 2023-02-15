const models = require("../models");

const getProducts = (req, res) => {
  models.products
    .findAll()
    .then(([rows]) => {
      res.status(200).json(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const postProduct = (req, res) => {
  const product = req.body;
  models.products
    .insert(product)
    .then(([rows]) => {
      const message = "Product successfully created.";
      res.location(`/products/${rows.insertId}`).status(201).json(message);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.message });
    });
};

const getProductById = (req, res) => {
  models.products
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

const getProductByName = (req, res, next) => {
  models.products
    .findByName(req.params.name)
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

const editProduct = (req, res) => {
  const product = req.body;
  product.id = parseInt(req.params.id, 10);
  models.products
    .update(product)
    .then(([rows]) => {
      if (rows.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        const message = "Product successfully modified.";
        res.status(200).json({ message });
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const deleteProduct = (req, res) => {
  models.products
    .delete(req.params.id)
    .then(([rows]) => {
      if (rows.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        const message = "Product successfully deleted ";
        res.status(200).json({ message });
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  getProducts,
  postProduct,
  getProductByName,
  getProductById,
  editProduct,
  deleteProduct,
};
