import db from "../database/db-config.js";
import { DataTypes } from "sequelize";

const User = db.define('users', {
  fullname: {
    type: DataTypes.STRING(30),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(30),
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  nomorHP: {
    type: DataTypes.STRING(14),
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: true,
  },
  facilityId: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  timestamps: true,
  freezeTableName: true
})

export default User;