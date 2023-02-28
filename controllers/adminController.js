import Facility from "../models/Facility.js";

const insertNewFacility = (req, res) => {
  const { namaFasilitas, alamat, deskripsi, rekening, koordinat, pengelola } = req.body;

  const facility = Facility.create({
    namaFasilitas,
    alamat,
    deskripsi,
    rekening
  })
}