const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    const hashed = await bcrypt.hash("123456", 10);
    await User.create({ email: "admin@gmail.com", password: hashed });
    await User.create({ email: "admin1@gmail.com", password: "1234" });
    console.log("Tạo user thành công ✅");
    process.exit();
  });
