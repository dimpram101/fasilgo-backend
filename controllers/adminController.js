import Facility from "../models/Facility.js";
import User from "../models/User.js";
import Transaction from "../models/Transaction.js"
import { userRegistrationSchema } from "../utils/joyVerification.js";
import TransactionDocument from "../models/TransactionDocument.js";
import TransactionPhoto from "../models/TransactionPhoto.js";
import FacilityPhoto from "../models/FacilityPhoto.js";
import FacilityAvailability from "../models/FacilityAvailability.js";
import bcrypt from "bcrypt";


// Facility
const getAllFacilities = async (req, res) => {
  await Facility.findAll({
    include: [
      {
        model: User,
        attributes: ['id', 'fullname', 'email', 'nomorHP']
      },
      { model: FacilityPhoto },
      { model: FacilityAvailability }
    ]
  }).then(facilities => {
    if (!facilities) {
      return res.status(404).json({ msg: "Gagal mendapatkan data fasilitas karena tidak ada data apapun", payload: null })
    }

    return res.status(200).json({ msg: "Berhasil mendapatkan data fasilitas", payload: facilities })
  })
    .catch(err => res.status(400).json({ msg: "Gagal mendapatkan data fasilitas", payload: err }))
}

const getFacilityById = async (req, res) => {
  const { id } = req.params;

  try {
    const facility = await Facility.findOne({
      where: { id },
      include: [
        {
          model: User,
          attributes: ['id', 'fullname', 'email', 'nomorHP']
        },
        { model: FacilityPhoto },
        { model: FacilityAvailability }
      ]
    });

    if (!facility) {
      return res.status(404).json({ msg: "Gagal mendapatkan data fasilitas karena tidak ada data apapun", payload: null })
    }

    return res.status(200).json({ msg: `Berhasil mendapatkan data fasilitas dengan id : ${id}`, payload: facility });
  } catch (error) {
    return res.status(400).json({
      msg: "Gagal mengambil data!",
      payload: error
    })
  }
}

const insertNewFacility = async (req, res) => {
  const { facility, facilityPhoto } = req.body;
  try {
    const f = await Facility.create(facility);
    if (facilityPhoto) {
      facilityPhoto.forEach(async (photo) => {
        await FacilityPhoto.create({
          ...photo,
          facilityId: f.id
        });
      })
    }

    return res.status(201).json({
      msg: "Fasilitas berhasil dibuat!",
    });
  } catch (error) {
    return res.status(400).json({
      msg: "Fasilitas gagal dibuat!",
      payload: error
    })
  }
}

const editFacility = async (req, res) => {
  const { id } = req.params;
  const { facility, facilityAvailability } = req.body;

  try {
    await Facility.update(facility, {
      where: { id }
    });

    if (facilityAvailability) {
      await FacilityAvailability.create({
        ...facilityAvailability,
        facilityId: id
      });
    }

    return res.status(200).json({
      msg: "Fasilitas berhasil diperbaharui!",
    });
  } catch (error) {
    return res.status(400).json({
      msg: "Fasilitas gagal diperbaharui!",
      payload: error
    })
  }
}

const deleteFacility = async (req, res) => {
  const { id } = req.params;

  await Facility.destroy({
    where: {
      id
    }
  }).then(() => res.status(200).json({ msg: "Fasilitas berhasil dihapus!" }))
    .catch(err => res.status(400).json({ msg: "Gagal menghapus fasilitas!", err }))
}

// Facility Photo
const addFacilityPhoto = async (req, res) => {
  const { id } = req.params;
  const { facilityPhoto } = req.body;

  facilityPhoto.forEach(async (photo) => {
    await FacilityPhoto.create({
      ...photo,
      facilityId: id
    });
  }).then(() => res.status(200).json({ msg: "Foto berhasil ditambahkan!" }))
    .catch(err => res.status(200).json({ msg: "Foto gagal ditambahkan!", payload: err }))
}

const deleteFacilityPhoto = async (req, res) => {
  const { id, photoId } = req.params;

  try {
    const facility = await FacilityPhoto.destroy({
      where: {
        id: photoId,
        facilityId: id
      }
    })

    if (!facility) {
      return res.status(404).json({
        msg: "Gagal menghapus foto!, Karena foto tidak ditemukan atau telah dihapus"
      })
    }

    return res.status(200).json({ msg: "Berhasil menghapus foto" })
  } catch (error) {
    return res.status(400).json({ msg: "Gagal menghapus foto!", payload: error })
  }

  // .then(() => res.status(200).json({ msg: "Berhasil menghapus foto!" }))
  //   .catch(err => res.status(400).json({ msg: "Gagal menghapus foto!", payload: err }))
}

// Akun Pengelola
const createAkunPengelola = async (req, res) => {
  if (req.body.password !== req.body.confirmPassword)
    return res.status(400).json({ message: "Password tidak cocok dengan Confirm Password!" })

  try {
    const user = await userRegistrationSchema.validateAsync(req.body, { abortEarly: false })
    delete user.confirmPassword;

    const genSalt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(user.password, genSalt);

    await User.create({
      ...user,
      password: hashPassword
    }).then(user => res.status(201).json({ msg: "Berhasil membuat akun!", payload: user }));

  } catch (err) {
    return res.status(400).json({ err });
  }
}

const deleteAkunPengelola = async (req, res) => {
  const { pengelolaId } = req.body

  await User.destroy({
    where: {
      id: pengelolaId
    }
  }).then(() => res.status(200).json({ msg: "Akun berhasil dihapus!" }))
    .catch(err => res.status(400).json({ msg: "Gagal menghapus akun!", err }))
}


// Transaction
const getAllTransaction = async (req, res) => {
  await Transaction.findAll({
    include: [
      { model: TransactionDocument },
      { model: TransactionPhoto }
    ]
  }).then(transactions => {
    res.status(200).json({ msg: "Berhasil mendapatkan data transaksi", payload: transactions })
  }).catch(err => {
    res.status(400).json({ msg: "Berhasil mendapatkan data transaksi", payload: err })
  })
}

const getTransactionById = async (req, res) => {
  const { id } = req.params;

  await Transaction.findOne({
    where: { id },
    include: [
      { model: TransactionDocument },
      { model: TransactionPhoto }
    ]
  }).then(transaction => {
    if (!transaction) {
      return res.status(404).json({ msg: `Tidak ditemukan data transaksi dengan id: ${id}`, payload: null})
    }
    return res.status(200).json({ msg: `Berhasil mendapatkan data transaksi dengan id: ${id}`, payload: transaction })
  }).catch(err => {
    res.status(400).json({ msg: `Gagal mendapatkan data transaksi dengan id: ${id}`, payload: err })
  })
}

const updateTransaction = async (req, res) => {
  const { status } = req.body;

  await Transaction.update({ status })
    .then(result => res.status(200).json({ msg: "Transaksi berhasil diperbaharui!", payload: result }))
    .catch(err => res.status(400).json({ msg: "Transaksi gagal diperbaharui!", payload: err }));
}

export {
  getAllFacilities,
  getFacilityById,
  insertNewFacility,
  editFacility,
  deleteFacility,
  addFacilityPhoto,
  deleteFacilityPhoto,
  createAkunPengelola,
  deleteAkunPengelola,
  getAllTransaction,
  getTransactionById,
  updateTransaction
}