import db from "../database/db-config.js";
import { DataTypes } from "sequelize";

const Review = db.define('reviews', {
  borrowerId: {
    type: DataTypes.INTEGER
  },
  facilityId: {
    type: DataTypes.INTEGER
  },
  review: {
    type: DataTypes.TEXT
  }
}, {
  timestamps: true,
  freezeTableName: true
})

export default Review;