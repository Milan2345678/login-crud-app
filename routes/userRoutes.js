const express = require("express");
const router = express.Router();

// ✅ Import middleware FIRST
const auth = require("../middleware/auth");

// ✅ Import controller functions
const {
  registerUser,
  loginUser,
  getUsers,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

// ================= ROUTES =================

// ✅ REGISTER USER
router.post("/register", registerUser);

// ✅ LOGIN USER
router.post("/login", loginUser);

// ✅ GET ALL USERS
router.get("/", getUsers);

// ✅ UPDATE USER
router.put("/:id", updateUser);

// ✅ DELETE USER
router.delete("/:id", deleteUser);

// ✅ PROTECTED ROUTE (ONLY ONCE)
router.get("/profile", auth, (req, res) => {
  res.json({ message: "This is a protected route", user: req.user });
});

module.exports = router;