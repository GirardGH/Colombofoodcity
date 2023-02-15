const express = require("express");

const router = express.Router();
const { verifyToken, verifyRole } = require("../services/auth");
const categoriesCtrl = require("../controllers/categoriesController");

router.get("/api/categories", categoriesCtrl.getCategories);
router.get("/api/categories/id/:id", categoriesCtrl.getCategoryById);
router.put(
  "/api/categories/id/:id",
  verifyToken,
  verifyRole,
  categoriesCtrl.editCategory
);
router.get("/api/categories/name/:name", categoriesCtrl.getCategoryByName);
router.post(
  "/api/categories",
  verifyToken,
  verifyRole,
  categoriesCtrl.postCategory
);
router.delete(
  "/api/categories/id/:id",
  verifyToken,
  verifyRole,
  categoriesCtrl.deleteCategory
);

module.exports = router;
