const express = require("express");

const router = express.Router();

const reviewsCtrl = require("../controllers/reviewsControllers");

router.get("/api/reviews", reviewsCtrl.getReviews);
router.get("/api/reviews/id/:id", reviewsCtrl.getReviewById);
router.put("/api/reviews/id/:id", reviewsCtrl.editReview);
router.get(`/api/reviews/product/:product`, reviewsCtrl.getReviewByProductId);
router.get(`/api/reviews/user/:user`, reviewsCtrl.getReviewByUserId);
router.post("/api/reviews", reviewsCtrl.postReview);
router.delete("/api/reviews/id/:id", reviewsCtrl.deleteReview);

module.exports = router;
