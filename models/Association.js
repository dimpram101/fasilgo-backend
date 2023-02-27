import Peminjam from "./Peminjam.js"
import Pengelola from "./Pengelola.js";
import UserKTP from "./UserKTP.js";
import Facility from "./Facility.js";
import FacilityPhoto from "./FacilityPhoto.js";
import Review from "./Review.js";
import Transaction from "./Transaction.js";
import TransactionDocument from "./TransactionDocument.js";
import TransactionPhoto from "./TransactionPhoto.js";
import FacilityAvailability from "./FacilityAvailability.js";

Peminjam.hasMany(Review, {
  foreignKey: "borrowerId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
})

Review.belongsTo(Peminjam);

Facility.hasOne(Pengelola, {
  foreignKey: "facilityId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
});

Pengelola.belongsTo(Facility);

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

Peminjam.hasMany(Transaction, {
  foreignKey: "borrowerId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
})

Transaction.belongsTo(Peminjam);

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

Peminjam.hasOne(UserKTP, {
  foreignKey: "userId",
  constraints: false,
  scope: {
    userType: "borrower"
  }
});

Pengelola.hasOne(UserKTP, {
  foreignKey: "userId",
  constraints: false,
  scope: {
    userType: "manager"
  }
});

UserKTP.belongsTo(Peminjam, {
  foreignKey: "userId",
  constraints: false
});
UserKTP.belongsTo(Pengelola, {
  foreignKey: "userId",
  constraints: false
});

export {
  Peminjam,
  Pengelola,
  UserKTP,
  Review,
  Facility,
  FacilityPhoto,
  FacilityAvailability,
  Transaction,
  TransactionPhoto,
  TransactionDocument
};