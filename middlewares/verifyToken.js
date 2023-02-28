import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  console.log(req.headers['authorization']);
  console.log(req.headers.authorization);
  const header = req.headers['authorization'];
  const token = header && header.split(' ')[1];

  if (!token) res.status(401).json({ msg: "Tidak ada autentikasi!" })

  jwt.verify(token, process.env.ACCESS_SECRET_KEY, (err, decoded) => {
    if (err) return res.status(403).json({err});
    res.locals.userId = decoded.userId;
    res.locals.isAdmin = decoded.isAdmin;
    res.locals.facilityId = decoded.facilityId;
    next();
  })
}

export default verifyToken;