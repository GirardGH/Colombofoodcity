/* eslint-disable no-restricted-syntax */
const express = require("express");
const fs = require("fs");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

const upload = multer({ dest: "public/uploads" });

const router = express.Router();
const { verifyToken, verifyRole } = require("../services/auth");
const productsCtrl = require("../controllers/productsControllers");

router.delete(
  "/api/products/id/:id",
  verifyToken,
  verifyRole,
  productsCtrl.deleteProduct
);
router.get("/api/products", productsCtrl.getProducts);
router.get("/api/products/id/:id", productsCtrl.getProductById);
router.put(
  "/api/products/id/:id",
  verifyToken,
  verifyRole,
  productsCtrl.editProduct
);
router.get(`/api/products/name/:name`, productsCtrl.getProductByName);
router.post("/api/products", verifyToken, verifyRole, productsCtrl.postProduct);
router.post("/api/products/image", upload.single("image"), (req, res) => {
  const { originalname } = req.file;
  const { filename } = req.file;

  fs.rename(
    `../uploads/${filename}`,
    `../uploads/${uuidv4()}-${originalname}`,
    (err) => {
      console.log(req.file);
      if (err) throw err;
      res.send("File uploaded");
    }
  );
});

module.exports = router;
