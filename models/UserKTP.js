import db from "../database/db-config.js"
import { DataTypes } from "sequelize"

const UserKTP = db.define('ktp_user', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  imageName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  path: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  freezeTableName: true,
  timestamps: true
});

export default UserKTP;