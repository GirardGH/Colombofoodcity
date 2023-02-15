require("dotenv").config();
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1,
};

const hashPassword = (req, res, next) => {
  argon2
    .hash(req.body.password, hashingOptions)
    .then((hashedPassword) => {
      req.body.hashedPassword = hashedPassword;
      delete req.body.password;
      next();
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const verifyPassword = (req, res) => {
  argon2
    .verify(req.user.hashedPassword, req.body.password)
    .then((isVerified) => {
      if (isVerified) {
        const payload = {
          sub: req.user.id,
          isAdmin: req.user.isAdmin,
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: "2h",
        });
        delete req.user.hashedPassword;
        res.send({ token, user: req.user });
      } else {
        res.sendStatus(401);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const verifyToken = (req, res, next) => {
  try {
    const authorization = req.get("Authorization");
    if (authorization == null) {
      throw new Error("Authorization header is missing.");
    }

    const [type, token] = authorization.split(" ");
    if (type !== "Bearer") {
      throw new Error("Authorization header has not the 'bearer' type.");
    }

    req.payload = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    console.error(err);
    res.sendStatus(401);
  }
};

const getPayload = (req, res, next) => {
  const authorization = req.get("Authorization");
  const tok = authorization.split(" ");
  const payload = jwt.decode(tok[1]);
  req.payload = payload;
  next();
};

const verifyId = (req, res, next) => {
  if (Number(req.params.id) !== req.payload.sub) {
    res.sendStatus(422);
  }

  next();
};

const verifyUserId = (req, res, next) => {
  const authorization = req.get("Authorization");
  const tok = authorization.split(" ");
  const payload = jwt.decode(tok[1]);
  if (
    parseInt(req.params.id, 10) === parseInt(payload.sub, 10) ||
    payload.isAdmin ||
    payload.isAdminRegional
  ) {
    res.status(200);
    next();
  } else {
    res.sendStatus(401);
  }
};

const verifyRole = (req, res, next) => {
  if (req.payload.role !== "admin") {
    res.sendStatus(422);
  }

  next();
};

module.exports = {
  hashPassword,
  verifyPassword,
  verifyToken,
  verifyId,
  verifyRole,
  getPayload,
  verifyUserId,
};
