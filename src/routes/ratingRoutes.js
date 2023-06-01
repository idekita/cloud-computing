const { ratingHandler } = require("../handlers/ratingHandler");
const Joi = require("@hapi/joi");

const ratingRoutes = [
  {
    method: "GET",
    path: "/rating",
    handler: ratingHandler.getAllRatings,
    options: {
      auth: {
        strategy: "jwt",
      },
    },
  },
  {
    method: "POST",
    path: "/rating",
    handler: ratingHandler.createRating,
    options: {
      auth: {
        strategy: "jwt",
      },
      validate: {
        payload: Joi.object({
          id_proyek: Joi.number().required(),
          nilai: Joi.number().integer().min(1).max(5).required(),
        }),
      },
    },
  },
];

module.exports = ratingRoutes;
