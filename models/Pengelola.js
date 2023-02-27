import db from "../database/db-config.js";
import { DataTypes } from "sequelize";

const Pengelola = db.define('managers', {
  fullname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  ktp: {
    type: DataTypes.STRING,
    allowNull: true
  },
  nomorHP: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [7, 20],
        msg: "The password length should be between 7 and 20 characters"
      }
    }
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    allowNull: true,
  },
  facilityId: {
    type: DataTypes.INTEGER
  }
}, {
  timestamps: true,
  freezeTableName: true
})

export default Pengelola;