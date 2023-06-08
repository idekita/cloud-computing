const { authenticateToken } = require("../config/middleware/authMiddleware");
const Project = require("../models/Project");
const Category = require("../models/Category");
const Contributor = require("../models/Contributor");
const fs = require("fs");
const path = require("path");
const mime = require("mime-types");
const { nanoid } = require("nanoid");

const projectHandler = {
  getAllProjects: async (request, h) => {
    try {
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

  getAllProjectsByCategory: async (request, h) => {
    try {
      await authenticateToken(request, h);

      const getUsernameLogin = request.auth.username;
      const { kategori } = request.params;

      const projects = await Project.findAll({
        include: [
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
      console.log("s" + projects);
      const response = h.response({
        status: "success",
        message: "Daftar Project berhasil ditemukan",
        projects: projects,
      });
      response.code(200);
      return response;
    } catch (error) {
      console.error(error);
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
      await authenticateToken(request, h);
      const getUsernameLogin = request.auth.username;
      console.log(getUsernameLogin);
      const { file } = request.payload;

        if (!file) {
          return h
            .response({
              status: "fail",
              message: "File tidak ditemukan.",
            })
            .code(400);
        }

        const mimeType = mime.lookup(file.hapi.filename);
        console.log(mimeType);
        if (mimeType !== "image/png" && mimeType !== "image/jpeg") {
          return h.response({
            status: "fail",
            message: "File harus berupa gambar PNG atau JPEG.",
          }).code(400);
        }

        const uniqueFilename = `${nanoid()}.${mime.extension(mimeType)}`;
        console.log('test3 ' + uniqueFilename);
        const filePath = path.join("uploads/", uniqueFilename);
        const writeStream = fs.createWriteStream(filePath);

        // Simpan konten file ke dalam file yang dituju
        await new Promise((resolve, reject) => {
          file.pipe(writeStream);

          file.on("end", () => {
            writeStream.end();
            resolve();
          });

          writeStream.on("error", (error) => {
            reject(error);
          });
        });
      // end untuk upload file

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
        gambar: uniqueFilename,
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
      console.log(error);
      const response = h.response({
        status: "fail",
        message: "Gagal membuat project",
      });
      response.code(500);
      return response;
    }
  },

  deleteProjectById: async (request, h) => {
    try {
      await authenticateToken(request, h);

      const { id_proyek } = request.params;
      const getUsernameLogin = request.auth.username;

      const project = await Project.findOne({
        where: {
          creator: getUsernameLogin,
          id_proyek: id_proyek,
        },
      });
      const filePath = path.join("uploads/", project.gambar);

      // Hapus file terkait
      fs.unlinkSync(filePath);

      const deletedProject = await Project.destroy({
        where: {
          creator: getUsernameLogin,
          id_proyek: id_proyek,
        },
      });

      if (deletedProject === 0) {
        const response = h.response({
          status: "fail",
          message: "Proyek tidak ditemukan atau Anda tidak memiliki akses",
        });
        response.code(404);
        return response;
      }

      const response = h.response({
        status: "success",
        message: "Proyek berhasil dihapus",
      });
      response.code(200);
      return response;
    } catch (error) {
      const response = h.response({
        status: "fail",
        message: "Gagal menghapus proyek",
      });
      response.code(500);
      return response;
    }
  },

  updateStatusProject: async (request, h) => {
    try {
      await authenticateToken(request, h);

      const { id_proyek } = request.params;
      const { status } = request.payload;
      const getUsernameLogin = request.auth.username;

      // Dapatkan project berdasarkan id_proyek
      const project = await Project.findOne({
        where: { id_proyek },
      });

      if (!project) {
        const response = h.response({
          status: "fail",
          message: "Project tidak ditemukan",
        });
        response.code(404);
        return response;
      }

      // Periksa apakah pengguna yang melakukan permintaan adalah pembuat proyek yang sesuai
      if (project.creator !== getUsernameLogin) {
        const response = h.response({
          status: "fail",
          message: "Anda tidak memiliki izin untuk mengubah status proyek",
        });
        response.code(403);
        return response;
      }

      // Menggunakan metode update pada model Project untuk mengubah field status
      const updatedProject = await Project.update(
        { status: status },
        { where: { id_proyek } }
      );

      if (updatedProject[0] === 1) {

        // Jika ada satu kontributor yang berhasil diubah
        const response = h.response({
          status: "success",
          message: "Berhasil merubah status proyek",
        });
        response.code(200);
        return response;
      } else {
        // Jika tidak ada kontributor yang diubah atau kondisi tidak cocok
        const response = h.response({
          status: "fail",
          message: "Tidak ada perubahan",
        });
        response.code(404);
        return response;
      }
    } catch (error) {
      console.log(error);
      const response = h.response({
        status: "error",
        message: "Terjadi kesalahan server",
      });
      response.code(500);
      return response;
    }
  }
};

module.exports = {
  projectHandler,
};
