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
console.log(process.env.DB_NAME);
// buat lokal
// const sequelize = new Sequelize("idekita", "root", "idekita", {
//   host: "34.101.209.92",
//   dialect: "mysql",
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
