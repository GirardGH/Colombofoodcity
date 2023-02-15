/* eslint-disable camelcase */
const Joi = require("joi");

// >>>>>>>>>>>>>>>>>>>>user
// définition du modèle type pour le user
const usersSchema = Joi.object({
  firstname: Joi.string().max(100).required(),
  lastname: Joi.string().max(100).required(),
  email: Joi.string().trim().max(100).email().required(),
  phone: Joi.string()
    .trim()
    .regex(/^[0-9]{10,14}$/)
    .required(),
  password: Joi.string().min(7).max(50).required(),
  role: Joi.string().max(100).empty(null),
});

// test de validation selon le modèle type
const validateUser = (req, res, next) => {
  const { firstname, lastname, email, phone, password, role } = req.body;

  const { error } = usersSchema.validate(
    {
      firstname,
      lastname,
      email,
      phone,
      password,
      role,
    },
    { abortEarly: false }
  );

  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    next();
  }
};
// >>>>>>>>>>>>>>>>>>>>direction

const directionSchema = Joi.object({
  title: Joi.string().max(255).required(),
  colorLabel: Joi.string().max(255).required(),
  description: Joi.string().required(),
});

const validateDirection = (req, res, next) => {
  const { title, colorLabel, description } = req.body;
  const { error } = directionSchema.validate(
    {
      title,
      colorLabel,
      description,
    },
    { abortEarly: false }
  );
  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    next();
  }
};

module.exports = {
  validateUser,
  validateDirection,
};
