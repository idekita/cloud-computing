const { authHandler } = require("../handlers/authHandler");
const Joi = require("@hapi/joi");

const authRoutes = [
  {
    method: "POST",
    path: "/login",
    handler: authHandler.login,
    options: {
      validate: {
        payload: Joi.object({
          username: Joi.string().required(),
          password: Joi.string().required(),
        }),
      },
      auth: false,
    },
  },
  {
    method: "POST",
    path: "/register",
    handler: authHandler.register,
    options: {
      validate: {
        payload: Joi.object({
          username: Joi.string().required(),
          password: Joi.string().required(),
          name: Joi.string().required(),
          email: Joi.string().email().required(),
        }),
      },
      auth: false,
    },
  },
  {
    method: "POST",
    path: "/logout",
    handler: authHandler.logout,
    options: {
      auth: {
        strategy: "jwt",
      },
    },
  },
];

module.exports = authRoutes;
