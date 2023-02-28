import db from "../database/db-config.js";
import { DataTypes } from "sequelize";

const Transaction = db.define('transactions', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  atasNama: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  keteranganPenggunaan: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM(['Menunggu', 'Terverifikasi', 'Selesai', 'Ditolak', 'Revisi'])
  }
}, {
  timestamps: true,
  createdAt: 'tanggalTransaksi',
})

export default Transaction;