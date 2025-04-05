const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Lấy token sau "Bearer "

  if (!token) {
    return res.status(401).json({ message: "Chưa đăng nhập" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // lưu thông tin user vào request
    next(); // cho phép tiếp tục
  } catch (err) {
    res.status(403).json({ message: "Token không hợp lệ" });
  }
}

module.exports = verifyToken;
