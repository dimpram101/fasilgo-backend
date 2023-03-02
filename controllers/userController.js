import Transaction from "../models/Transaction.js";
import TransactionPhoto from "../models/TransactionPhoto.js";
import User from "../models/User.js";
import { editUserSchema, transactionSchema } from "../utils/joyVerification.js";

export const inputKTP = async (req, res) => {
  res.send('input KTP')
};

export const editAccount = async (req, res) => {
  const { id } = req.params;
  const { fullname, email, nomorHP } = req.body;

  const validatedData = await editUserSchema.validateAsync({
    fullname,
    nomorHP,
    email
  })

  await User.update(validatedData, {
    where: {
      id
    }
  }).then(() => res.status(200).json({ msg: "Akun berhasil diperbaharui!" }))
    .catch(err => res.status(400).json({ msg: "Gagal memperbaharui akun!", payload: err }))
}

export const createTransaction = async (req, res) => {
  const { userId, facilityId, atasNama, keteranganPenggunaan, tanggalPeminjaman, tanggalSelesai } = req.body;
  const validatedData = await transactionSchema.validateAsync({
    atasNama,
    keteranganPenggunaan,
    tanggalPeminjaman,
    tanggalSelesai
  });

  await Transaction.create({
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

  try {
    files.forEach(async (file) => {
      await TransactionPhoto.create({
        transactionId,
        photoTitle,
        path: file.path,
        userId
      })
    })

    return res.status(201).json({ msg: "Berhasil menambahkan bukti transaksi!" })

  } catch (error) {
    res.status(400).json({ msg: "Gagal menambahkan bukti transaksi!", payload: error })
  }


  console.log(path);
  // await TransactionPhoto.create()
}

