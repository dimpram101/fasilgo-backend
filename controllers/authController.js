import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import { userLoginSchema, userRegistrationSchema } from "../utils/joyVerification.js";

const saltRound = 10;

export const register = async (req, res) => {
  if (req.body.password !== req.body.confirmPassword)
    return res.status(400).json({ message: "Password tidak cocok dengan Confirm Password!" })

  try {
    const user = await userRegistrationSchema.validateAsync(req.body, { abortEarly: false })
    delete user.confirmPassword;

    const genSalt = await bcrypt.genSalt(saltRound);
    const hashPassword = await bcrypt.hash(user.password, genSalt);

    await User.create({
      ...user,
      password: hashPassword
    }).then(user => res.status(201).json({ user }));

  } catch (err) {
    return res.status(400).json({ err });
  }
};

export const login = async (req, res) => {
  try {
    const validatedUser = await userLoginSchema.validateAsync(req.body, { abortEarly: false });

    const user = await User.findOne({
      where: {
        email: validatedUser.email
      }
    })

    if (!user) return res.status(404).json({ msg: "Email atau Password salah" })

    await bcrypt.compare(validatedUser.password, user.password).then(result => {
      if (!result) return res.status(404).json({ msg: "Email atau Password salah" });
    })

    const accessToken = jwt.sign({ 
      userId: user.id,
      isAdmin: user.isAdmin,
      facilityId: user.facilityId
    }, process.env.ACCESS_SECRET_KEY, { expiresIn: '1h' });

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      maxAge: 1 * 60 * 60 * 1000,
    })

    res.status(200).json({
      msg: "Authorized",
      accessToken
    })
  } catch (error) {
    res.status(400).json({
      err
    })
  }
};

export const logout = (req, res) => {
  res.clearCookie('accessToken');
  res.status(200).json({
    msg: "Berhasil Logout"
  })
}
