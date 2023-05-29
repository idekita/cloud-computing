const User = require("../models/User");
const bcrypt = require("bcrypt");
const Jwt = require("jsonwebtoken");
const {
  secretKey,
  authenticateToken,
} = require("../config/middleware/authMiddleware");

const saltRounds = 10;
const authHandler = {
  login: async (request, h) => {
    const { username, password } = request.payload;

    // Cari pengguna berdasarkan username
    const user = await User.findOne({
      where: {
        username: username, // kondisi pencarian berdasarkan username
      },
    });

    if (user) {
      // Periksa kecocokan password
      const match = await bcrypt.compare(password, user.password);

      if (match) {
        // Buat token JWT
        const token = Jwt.sign(
          { username: user.username },
          secretKey,
          { expiresIn: "1h" } // Durasi token berlaku
        );

        const currentDate = new Date();
        const utcOffset = 420; // Offset waktu Indonesia (UTC+7) dalam menit
        const indonesiaDate = new Date(
          currentDate.getTime() + utcOffset * 60000
        );

        // Update field "last_login" dengan waktu saat ini
        user.last_login = indonesiaDate.toISOString();
        await user.save();

        const response = h.response({
          status: "success",
          message: "Login berhasil",
          user: {
            username: user.username,
            name: user.name,
            email: user.email,
          },
          token: token,
        });
        response.code(200);
        return response;
      }
    }
    const response = h.response({
      status: "fail",
      message: "Login Gagal",
    });
    response.code(401);
    return response;
  },

  register: async (request, h) => {
    try {
      const { username, password, name, email } = request.payload;

      // // Hash password sebelum disimpan
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const trimmedUsername = username.trim().toLowerCase().replaceAll(" ", "");

      // Simpan pengguna baru ke database
      const user = await User.create({
        username: trimmedUsername,
        password: hashedPassword,
        name,
        email,
      });

      const response = h.response({
        status: "success",
        message: "Registrasi berhasil",
        user: user,
      });
      response.code(201);
      return response;
    } catch (error) {
      const response = h.response({
        status: "fail",
        message: "Registrasi Gagal",
      });
      response.code(500);
      return response;
    }
  },

  getProfilByUsername: async (request, h) => {
    try {
      await authenticateToken(request, h);

      const getUsernameLogin = request.auth.username;

      const user = await User.findOne({
        where: {
          username: getUsernameLogin,
        },
        attributes: { exclude: ["password"] },
      });

      const response = h.response({
        status: "success",
        message: "Username berhasil ditemukan",
        user: user,
      });
      response.code(200);
      return response;
    } catch (error) {
      const response = h.response({
        status: "fail",
        message: "Username tidak ditemukan",
      });
      response.code(500);
      return response;
    }
  },

  logout: async (request, h) => {
    await authenticateToken(request, h);

    return {
      message: "Berhasil logout",
    };
  },
};
module.exports = {
  authHandler,
};
