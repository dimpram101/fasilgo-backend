import User from "./User.js";
import UserKTP from "./UserKTP.js";
import Facility from "./Facility.js";
import FacilityPhoto from "./FacilityPhoto.js";
import Review from "./Review.js";
import Transaction from "./Transaction.js";
import TransactionDocument from "./TransactionDocument.js";
import TransactionPhoto from "./TransactionPhoto.js";
import FacilityAvailability from "./FacilityAvailability.js";

User.hasMany(Review, {
  foreignKey: "userId"
})

Review.belongsTo(User);

User.hasOne(Facility, {
  foreignKey: "pengelolaId"
});

Facility.belongsTo(User, {
  foreignKey: "pengelolaId"
});

Facility.hasMany(Review, {
  foreignKey: "facilityId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
})

Review.belongsTo(Facility);

Facility.hasMany(FacilityPhoto, {
  foreignKey: "facilityId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
})

FacilityPhoto.belongsTo(Facility, {
  foreignKey: "facilityId"
});

Facility.hasMany(Transaction, {
  foreignKey: "facilityId"
})

Transaction.belongsTo(Facility, {
  foreignKey: "facilityId"
})

Facility.hasMany(FacilityAvailability, {
  foreignKey: "facilityId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
});

FacilityAvailability.belongsTo(Facility, {
  foreignKey: "facilityId",
});

User.hasMany(Transaction, {
  foreignKey: "userId"
})

Transaction.belongsTo(User, {
  foreignKey: "userId"
});

Transaction.hasMany(TransactionPhoto, {
  foreignKey: "transactionId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
});

TransactionPhoto.belongsTo(Transaction);

Transaction.hasOne(TransactionDocument, {
  foreignKey: "transactionId"
})

TransactionDocument.belongsTo(Transaction, { 
  as: "transDoc" 
});

User.hasOne(UserKTP, {
  foreignKey: "userId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
})
UserKTP.belongsTo(User);

export {
  User,
  UserKTP,
  Review,
  Facility,
  FacilityPhoto,
  FacilityAvailability,
  Transaction,
  TransactionPhoto,
  TransactionDocument
};