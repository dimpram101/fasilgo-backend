import Peminjam from "./Peminjam.js"
import Pengelola from "./Pengelola.js";
import Facility from "./Facility.js";
import FacilityPhoto from "./FacilityPhoto.js";
import Review from "./Review.js";
import Transaction from "./Transaction.js";
import TransactionDocument from "./TransactionDocument.js";
import TransactionPhoto from "./TransactionPhoto.js";

Peminjam.hasMany(Review, {
  foreignKey: "borrowerId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
})

Review.belongsTo(Peminjam);

Facility.hasMany(Review, {
  foreignKey: "facilityId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
})

Review.belongsTo(Facility);

Facility.hasMany(FacilityPhoto, {
  foreignKey: ""
})

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

Pengelola.hasOne(Facility, {
  foreignKey: "facilityId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
});

Facility.belongsTo(Pengelola);

export {
  Peminjam,
  Pengelola,
  Review,
  Facility,
  FacilityPhoto,
  Transaction,
  TransactionPhoto,
  TransactionDocument
};