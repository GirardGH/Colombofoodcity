const models = require("../models");

const getUsers = (req, res) => {
  models.users
    .findAll()
    .then(([result]) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

// const getUserById = (req, res) => {
//     models.users
//     .find(req.params.id)
//     .then(([result]) => {
//       if (result[0] == null) {
//         res.status(404).json({
//           error: "User not found",
//         });
//       } else {
//       res.status(200).json(result[0]);
//       }
//     })
//     .catch((err) => {
//       console.error(err);
//       res.status(500).json({
//         error: err,
//       });
//     });
// };

const getUserById = (req, res) => {
  const id = parseInt(req.params.id, 10);
  models.users
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

const getUserByName = (req, res, next) => {
  models.users
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

const postUser = (req, res) => {
  const user = req.body;
  models.users
    .insert(user)
    .then(([result]) => {
      const message = "User successfully created.";
      res.location(`/users/${result.insertId}`).status(201).json(message);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.message });
    });
};

const editUser = (req, res) => {
  const user = req.body;
  user.id = parseInt(req.params.id, 10);
  models.users
    .update(user)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        const message = "User successfully modified.";
        res.status(200).json({ message });
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const deleteUser = (req, res) => {
  models.users
    .delete(req.params.id)
    .then(([rows]) => {
      if (rows.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        const message = "User successfully deleted ";
        res.status(200).json({ message });
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const getUserByEmail = (req, res, next) => {
  models.users
    .findByEmail(req.body)
    .then(([user]) => {
      if (user == null) {
        res.sendStatus(401);
      } else {
        req.user = user;
        next();
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

module.exports = {
  getUsers,
  postUser,
  getUserByName,
  getUserById,
  editUser,
  deleteUser,
  getUserByEmail,
};
