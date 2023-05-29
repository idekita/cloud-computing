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
    method: "GET",
    path: "/proyek/kategori/{kategori}",
    handler: projectHandler.getAllProjectByCategory,
    options: {
      auth: {
        strategy: "jwt",
      },
    },
  },
  {
    method: "GET",
    path: "/proyek/status/{status}",
    handler: projectHandler.getProjectsByStatus,
    options: {
      auth: {
        strategy: "jwt",
      },
      validate: {
        params: Joi.object({
          status: Joi.string().valid("berlangsung", "selesai").required(),
        }),
      },
    },
  },
  {
    method: "GET",
    path: "/proyek/{id_proyek}",
    handler: projectHandler.getProjectsById,
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
