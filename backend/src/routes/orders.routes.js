const express = require("express");

const router = express.Router();
const { verifyToken, verifyRole } = require("../services/auth");
const ordersCtrl = require("../controllers/ordersControllers");

router.get("/api/orders", verifyToken, verifyRole, ordersCtrl.getOrders);
router.get(
  "/api/orders/id/:id",
  verifyToken,
  verifyRole,
  ordersCtrl.getOrderByUser
);
router.get(
  "/api/orders/user/:user",
  verifyToken,
  verifyRole,
  ordersCtrl.getOrderByUser
);
router.get(
  "/api/orders/number/:number",
  verifyToken,
  verifyRole,
  ordersCtrl.getOrderByNumber
);
router.get(
  "/api/orders/date/:date",
  verifyToken,
  verifyRole,
  ordersCtrl.getOrderByDate
);
router.get(
  "/api/orders/total/:status",
  verifyToken,
  verifyRole,
  ordersCtrl.getOrderByStatus
);
router.put("/api/orders/id/:id", verifyToken, verifyRole, ordersCtrl.editOrder);
router.post("/api/orders", verifyToken, verifyRole, ordersCtrl.postOrder);
router.delete(
  "/api/orders/id/:id",
  verifyToken,
  verifyRole,
  ordersCtrl.deleteOrder
);

module.exports = router;
