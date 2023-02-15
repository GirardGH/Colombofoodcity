const express = require("express");

const router = express.Router();
const usersCtrl = require("../controllers/usersControllers");
const { validateUser } = require("../services/validator");
const {
  hashPassword,
  verifyPassword,
  verifyToken,
  verifyId,
  verifyRole,
} = require("../services/auth");

router.post("/api/login", usersCtrl.getUserByEmail, verifyPassword);
router.post("/api/users", validateUser, hashPassword, usersCtrl.postUser);

router.get("/api/users", usersCtrl.getUsers);
router.get("/api/users/id/:id", usersCtrl.getUserById);
router.put(
  "/api/users/id/:id",
  verifyToken,
  verifyId,
  validateUser,
  usersCtrl.editUser
);
router.get(
  "/api/users/name/:name",
  verifyToken,
  verifyRole,
  usersCtrl.getUserByName
);
router.delete("/api/users/id/:id", verifyToken, verifyId, usersCtrl.deleteUser);

module.exports = router;
