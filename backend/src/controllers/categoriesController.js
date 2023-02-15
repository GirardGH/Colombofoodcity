const models = require("../models");

const getCategories = (req, res) => {
  models.categories
    .findAll()
    .then(([rows]) => {
      res.status(200).json(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const postCategory = (req, res) => {
  const category = req.body;
  models.categories
    .insert(category)
    .then(([rows]) => {
      const message = "category successfully created.";
      res.location(`/categorys/${rows.insertId}`).status(201).json(message);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.message });
    });
};

const getCategoryById = (req, res) => {
  models.categories
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

const getCategoryByName = (req, res, next) => {
  models.categories
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

const editCategory = (req, res) => {
  const category = req.body;
  category.id = parseInt(req.params.id, 10);
  models.categories
    .update(category)
    .then(([rows]) => {
      if (rows.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        const message = "category successfully modified.";
        res.status(200).json({ message });
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const deleteCategory = (req, res) => {
  models.categories
    .delete(req.params.id)
    .then(([rows]) => {
      if (rows.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        const message = "Category successfully deleted ";
        res.status(200).json({ message });
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};
module.exports = {
  getCategories,
  postCategory,
  getCategoryByName,
  getCategoryById,
  editCategory,
  deleteCategory,
};
