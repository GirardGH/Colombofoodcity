const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const usersRouter = require("./routes/users.routes");
const productsRouter = require("./routes/products.routes");
const categoriesRouter = require("./routes/categories.routes");
const ordersRouter = require("./routes/orders.routes");
const reviewsRouter = require("./routes/reviews.routes");

const app = express();

// use some application-level middlewares
app.use(
  cors({
    origin: process.env.FRONTEND_URL ?? "http://localhost:3000",
    optionsSuccessStatus: 200,
  })
);

app.use(express.json());

// Serve the public folder for public resources
app.use(express.static(path.join(__dirname, "../public")));

// Serve REACT APP
app.use(express.static(path.join(__dirname, "..", "..", "frontend", "dist")));

// API routes
app.use(usersRouter);
app.use(productsRouter);
app.use(categoriesRouter);
app.use(ordersRouter);
app.use(reviewsRouter);

// Redirect all requests to the REACT app
const reactIndexFile = path.join(
  __dirname,
  "..",
  "..",
  "frontend",
  "dist",
  "index.html"
);

if (fs.existsSync(reactIndexFile)) {
  app.get("*", (req, res) => {
    res.sendFile(reactIndexFile);
  });
}

// ready to export
module.exports = app;
