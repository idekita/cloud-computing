const { authenticateToken } = require("../config/middleware/authMiddleware");
const Project = require("../models/Project");
const Category = require("../models/Category");
const Contributor = require("../models/Contributor");

const projectHandler = {
  getAllProjects: async (request, h) => {
    try {
      // Periksa token JWT yang dikirimkan dalam header Authorization
      await authenticateToken(request, h);

      const getUsernameLogin = request.auth.username;

      const projects = await Project.findAll({
        include: [
          {
            model: Category,
            attributes: ["nm_kategori"],
          },
        ],
        order: [["tanggal_mulai", "DESC"]],
      });

      const response = h.response({
        status: "success",
        message: "Daftar Project berhasil ditemukan",
        projects: projects,
      });
      response.code(200);
      return response;
    } catch (error) {
      const response = h.response({
        status: "fail",
        message: "Gagal mengambil daftar project",
      });
      response.code(500);
      return response;
    }
  },

  getAllProjectByCategory: async (request, h) => {
    try {
      // Periksa token JWT yang dikirimkan dalam header Authorization
      await authenticateToken(request, h);

      const getUsernameLogin = request.auth.username;
      const { kategori } = request.params;

      const projects = await Project.findAll({
        winclude: [
          {
            model: Category,
            where: {
              nm_kategori: kategori,
            },
            attributes: ["nm_kategori"],
          },
        ],
      });

      const response = h.response({
        status: "success",
        message: "Daftar Project berhasil ditemukan",
        projects: projects,
      });
      response.code(200);
      return response;
    } catch (error) {
      const response = h.response({
        status: "fail",
        message: "Gagal mengambil daftar project",
      });
      response.code(500);
      return response;
    }
  },

  getProjectsById: async (request, h) => {
    try {
      // Periksa token JWT yang dikirimkan dalam header Authorization
      await authenticateToken(request, h);

      const { id_proyek } = request.params;

      const getUsernameLogin = request.auth.username;

      const projects = await Project.findAll({
        where: {
          creator: getUsernameLogin,
          id_proyek: id_proyek,
        },
        include: [
          {
            model: Category,
            attributes: ["nm_kategori"],
          },
        ],
      });

      const response = h.response({
        status: "success",
        message: "Daftar Project berhasil ditemukan",
        projects: projects,
      });
      response.code(200);
      return response;
    } catch (error) {
      const response = h.response({
        status: "fail",
        message: "Gagal mengambil daftar project",
      });
      response.code(500);
      return response;
    }
  },

  getProjectsByStatus: async (request, h) => {
    try {
      await authenticateToken(request, h);

      const { status } = request.params;

      const getUsernameLogin = request.auth.username;
      console.log("p");
      const projects = await Project.findAll({
        where: {
          status: status,
        },
        include: [
          {
            model: Contributor,
            where: {
              username: getUsernameLogin,
            },
          },
          {
            model: Category,
            attributes: ["nm_kategori"],
          },
        ],
      });
      console.log("q");
      const response = h.response({
        status: "success",
        message: "Daftar Project berhasil ditemukan",
        projects: projects,
      });
      response.code(200);
      return response;
    } catch (error) {
      const response = h.response({
        status: "fail",
        message: "Gagal mengambil daftar project",
      });
      response.code(500);
      return response;
    }
  },

  createProject: async (request, h) => {
    try {
      console.log("helo");
      // Periksa token JWT yang dikirimkan dalam header Authorization
      await authenticateToken(request, h);
      const getUsernameLogin = request.auth.username;
      console.log(getUsernameLogin);
      const {
        nm_proyek,
        id_kategori,
        deskripsi,
        tanggal_mulai,
        tanggal_selesai,
      } = request.payload;

      const project = await Project.create({
        creator: getUsernameLogin,
        nm_proyek,
        id_kategori,
        deskripsi,
        tanggal_mulai,
        tanggal_selesai,
      });

      const response = h.response({
        status: "success",
        message: "Project berhasil dibuat",
        project: project,
      });
      response.code(201);
      return response;
    } catch (error) {
      const response = h.response({
        status: "fail",
        message: "Gagal membuat project",
      });
      response.code(500);
      return response;
    }
  },
};

module.exports = {
  projectHandler,
};
