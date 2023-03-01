import User from "../models/User.js";

const isEmailExist = async (req, res, next) => {
  const user = await User.findAll({
    where: {
      email: req.body.email
    },
    attributes: ['id']
  });
  
  if (user.length > 0)
    return res.status(400).json({ msg: "Tidak dapat menggunakan email" })

  next();
}

export { isEmailExist };