import db from "../database/db-config.js";
import { DataTypes } from "sequelize";

const Transaction = db.define('transactions', {
  borrowerId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  atasNama: {
    type: DataTypes.STRING,
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