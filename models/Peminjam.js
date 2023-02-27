import db from "../database/db-config.js"
import { DataTypes } from "sequelize"

const Peminjam = db.define('borrowers', {
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
  }
}, {
  timestamps: true,
  freezeTableName: true
})

export default Peminjam;