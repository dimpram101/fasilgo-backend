import db from "../database/db-config.js"
import { DataTypes } from "sequelize"

const FacilityAvailability = db.define('facility_availabilities', {
  facilityId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  tanggalPeminjaman: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  tanggalSelesai: {
    type: DataTypes.DATEONLY,
    allowNull: false
  }
}, {
  timestamps: false,
  freezeTableName: true
});

export default FacilityAvailability;