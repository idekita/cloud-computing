const { projectHandler } = require("../handlers/projectHandler");
const Joi = require("@hapi/joi");

const projectRoutes = [
  {
    method: "GET",
    path: "/proyek",
    handler: projectHandler.getAllProjects,
    options: {
      auth: {
        strategy: "jwt",
      },
    },
  },
  {
    method: "POST",
    path: "/proyek",
    handler: projectHandler.createProject,
    options: {
      auth: {
        strategy: "jwt",
      },
      validate: {
        payload: Joi.object({
          nm_proyek: Joi.string().required(),
          id_kategori: Joi.number().required(),
          deskripsi: Joi.string().required(),
          tanggal_mulai: Joi.date().required(),
          tanggal_selesai: Joi.date().required(),
        }),
      },
    },
  },
];

module.exports = projectRoutes;
