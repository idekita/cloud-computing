const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Project = require("./Project");
const User = require("./User");

const Contributor = sequelize.define(
  "contributors",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "id_kontributor", // menentukan nama kolom di database
    },
    id_proyek: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Project,
        key: "id_proyek",
      },
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: User,
        key: "username",
      },
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "-",
    },
    status_lamaran: {
      type: DataTypes.ENUM("menunggu", "ditolak", "diterima"),
      allowNull: false,
      defaultValue: "menunggu",
    },
  },
  {
    timestamps: false, // menonaktifkan fitur timestamps
  }
);

// Definisikan hubungan antara Contributor dengan Project dan User
Contributor.belongsTo(Project, {
  foreignKey: "id_proyek",
  targetKey: "id",
});
Contributor.belongsTo(User, { foreignKey: "username", targetKey: "username" });

module.exports = Contributor;
