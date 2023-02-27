import db from "../database/db-config.js";
import { DataTypes } from "sequelize";

const Facility = db.define('facilities', {
  namaFasilitas: {
    type: DataTypes.STRING,
    allowNull: false
  },
  alamat: {
    type: DataTypes.STRING,
    allowNull: false
  },
  deskripsi: {
    type: DataTypes.STRING,
    allowNull: false
  }, 
  rekening: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM(['Tersedia', 'Tidak tersedia']),
    allowNull: false
  }
}, {
  timestamps: true,
  freezeTableName: true
})

export default Facility;