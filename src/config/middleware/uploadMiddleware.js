const path = require("path");

const allowedExtensions = [".jpg", ".jpeg", ".png"];

const uploadMiddleware = (req, res, next) => {
  const { file } = req.payload;

  if (!file) {
    return res
      .response({
        status: "fail",
        message: "File tidak ditemukan.",
      })
      .code(400);
  }

  const fileExt = path.extname(file.hapi.filename).toLowerCase();
  if (!allowedExtensions.includes(fileExt)) {
    return res
      .response({
        status: "fail",
        message: "File harus berupa gambar dengan format .jpg, .jpeg, atau .png.",
      })
      .code(400);
  }

  next();
};

module.exports = uploadMiddleware;
