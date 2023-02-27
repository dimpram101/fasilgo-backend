import db from "../database/db-config.js";
import { DataTypes } from "sequelize";

const FacilityPhoto = db.define('facility_photos', {
  facilityId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  photoTitle: {
    type: DataTypes.STRING,
    allowNull: false
  },
  path: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: false,
  freezeTableName: true
})

export default FacilityPhoto;