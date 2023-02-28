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
  foreignKey: "userId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
})

Review.belongsTo(User);

Facility.hasOne(User, {
  foreignKey: "facilityId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
});

User.belongsTo(Facility);

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

FacilityPhoto.belongsTo(Facility);

Facility.hasMany(FacilityAvailability, {
  foreignKey: "facilityId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
});

FacilityAvailability.belongsTo(Facility);

User.hasMany(Transaction, {
  foreignKey: "userId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
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

TransactionDocument.belongsTo(Transaction);

User.hasOne(UserKTP, {
  foreignKey: "userId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
})
UserKTP.belongsTo(User);

// Peminjam.hasOne(UserKTP, {
//   foreignKey: "userId",
//   constraints: false,
//   scope: {
//     userType: "borrower"
//   }
// });

// Pengelola.hasOne(UserKTP, {
//   foreignKey: "userId",
//   constraints: false,
//   scope: {
//     userType: "manager"
//   }
// });

// UserKTP.belongsTo(Peminjam, {
//   foreignKey: "userId",
//   constraints: false
// });
// UserKTP.belongsTo(Pengelola, {
//   foreignKey: "userId",
//   constraints: false
// });

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