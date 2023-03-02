import Transaction from "../models/Transaction.js";
import TransactionPhoto from "../models/TransactionPhoto.js";
import User from "../models/User.js";
import UserKTP from "../models/UserKTP.js";
import { editUserSchema, transactionSchema } from "../utils/joyVerification.js";

export const inputKTP = async (req, res) => {
  const userId = res.locals.userId;
  const file = req.file;
  const fileName = file.originalname.split('.')[0];
  console.log(file)
  UserKTP.create({
    userId,
    imageName: fileName,
    path: file.path
  }).then(() => res.status(201).json({ msg: "Berhasil memasukkan data!" }))
    .catch(err => res.status(400).json({ msg: "Gagal menambahkan data!", payload: err }))
  // res.send(file)
};

export const editAccount = async (req, res) => {
  const userId = res.locals.userId;
  const { fullname, email, nomorHP } = req.body;

  const validatedData = await editUserSchema.validateAsync({
    fullname,
    nomorHP,
    email
  })

  User.update(validatedData, {
    where: {
      id: userId
    }
  }).then(() => res.status(200).json({ msg: "Akun berhasil diperbaharui!" }))
    .catch(err => res.status(400).json({ msg: "Gagal memperbaharui akun!", payload: err }))
}

export const createTransaction = async (req, res) => {
  console.log(req.body)
  const userId = res.locals.userId;
  const { facilityId, atasNama, keteranganPenggunaan, tanggalPeminjaman, tanggalSelesai } = req.body;
  const validatedData = await transactionSchema.validateAsync({
    atasNama,
    keteranganPenggunaan,
    tanggalPeminjaman,
    tanggalSelesai
  });

  Transaction.create({
    ...validatedData,
    userId,
    facilityId
  }).then(() => res.status(201).json({
    msg: "Pengajuan kamu telah diajukan, harap menunggu verifikasi!"
  })).catch(err => res.status(400).json({
    msg: "Pengajuan gagal",
    payload: err
  }))
}

export const insertTransactionPayment = async (req, res) => {
  const userId = res.locals.userId;
  const { transactionId } = req.params;
  const { photoTitle } = req.body;
  const files = req.files;

  files.forEach((file) => {
    TransactionPhoto.create({
      transactionId,
      photoTitle,
      path: file.path,
      userId
    }).catch(err => res.status(400).json({ msg: "Gagal menambahkan bukti transaksi!", payload: err }))
  })

  return res.status(201).json({ msg: "Berhasil menambahkan bukti transaksi!" })
}

