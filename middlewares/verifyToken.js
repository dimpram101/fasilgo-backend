import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const header = req.headers['authorization'];
  const token = header && header.split(' ')[1];

  if (!token) res.status(401).json({ msg: "Tidak ada autentikasi!" })

  jwt.verify(token, process.env.ACCESS_SECRET_KEY, (err, decoded) => {
    if (err) return res.status(403).json({err});
    res.locals.userId = decoded.userId;
    next();
  })
}

export default verifyToken;