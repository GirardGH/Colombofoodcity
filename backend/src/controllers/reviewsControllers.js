const models = require("../models");

const getReviews = (req, res) => {
  models.reviews
    .findAll()
    .then(([result]) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const getReviewById = (req, res) => {
  const id = parseInt(req.params.id, 10);
  models.reviews
    .find(id)
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

const getReviewByProductId = (req, res, next) => {
  models.reviews
    .findByProductId(req.params.id)
    .then(([result]) => {
      if (result[0] == null) {
        res.sendStatus(404);
      } else {
        res.status(200).json(result);
        next();
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const getReviewByUserId = (req, res, next) => {
  models.reviews
    .findByUserId(req.params.id)
    .then(([result]) => {
      if (result[0] == null) {
        res.sendStatus(404);
      } else {
        res.status(200).json(result);
        next();
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const postReview = (req, res) => {
  const review = req.body;
  models.reviews
    .insert(review)
    .then(([rows]) => {
      const message = "Review successfully created.";
      res.location(`/users/${rows.insertId}`).status(201).json(message);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.message });
    });
};

const editReview = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const review = req.body;
  models.reviews
    .update(id, review)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        const message = "Review successfully updated.";
        res.status(200).json(message);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.message });
    });
};

const deleteReview = (req, res) => {
  const id = parseInt(req.params.id, 10);
  models.reviews
    .delete(id)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        const message = "Review successfully deleted.";
        res.status(200).json(message);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.message });
    });
};

module.exports = {
  getReviews,
  getReviewById,
  getReviewByProductId,
  getReviewByUserId,
  postReview,
  editReview,
  deleteReview,
};
