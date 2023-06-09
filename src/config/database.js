const { Sequelize } = require("sequelize");

// Konfigurasi koneksi ke database
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
);

// const sequelize = new Sequelize("idekita", "root", "idekita", {
//   host: "/cloudsql/submission-mgce-dhillen:asia-southeast2:idekita",
//   dialect: "mysql",
//   dialectOptions: {
//     socketPath: "/cloudsql/submission-mgce-dhillen:asia-southeast2:idekita",
//   },
// });

// Tes koneksi ke database
sequelize
  .authenticate()
  .then(() => {
    console.log("Database telah terkoneksi");
  })
  .catch((error) => {
    console.error("Tidak dapat terhubung ke database:", error);
  });

module.exports = sequelize;
